param(
    [Parameter(Mandatory = $true)]
    [string]$StatePath,

    [Parameter(Mandatory = $true)]
    [int]$K6ProcessId,

    [Parameter(Mandatory = $true)]
    [int]$BackendProcessId,

    [int]$IntervalSeconds = 10
)

$ErrorActionPreference = 'Stop'
$state = Get-Content -Raw -LiteralPath $StatePath | ConvertFrom-Json
$output = Join-Path $state.resultDir 'endurance-resource-samples.csv'
$started = Get-Date
$processorCount = [Math]::Max(1, [Environment]::ProcessorCount)
$previousK6Cpu = $null
$previousBackendCpu = $null
$previousSampleAt = $null

function Get-ProcessSnapshot {
    param([int]$Id)

    $process = Get-Process -Id $Id -ErrorAction SilentlyContinue
    if ($null -eq $process) {
        return $null
    }

    [pscustomobject]@{
        CpuSeconds = [double]$process.CPU
        WorkingSetMb = [Math]::Round($process.WorkingSet64 / 1MB, 2)
    }
}

function Get-AvailableMemoryMb {
    try {
        $counter = Get-Counter '\Memory\Available MBytes' -ErrorAction Stop
        return [Math]::Round($counter.CounterSamples[0].CookedValue, 2)
    }
    catch {
        $os = Get-CimInstance Win32_OperatingSystem
        return [Math]::Round([double]$os.FreePhysicalMemory / 1024, 2)
    }
}

while ($true) {
    $sampleAt = Get-Date
    $k6 = Get-ProcessSnapshot -Id $K6ProcessId
    $backend = Get-ProcessSnapshot -Id $BackendProcessId
    $elapsed = [Math]::Round(($sampleAt - $started).TotalSeconds, 1)
    $rawPath = Join-Path $state.resultDir "raw\23127430_Endurance_$($state.runId).json"
    $rawBytes = if (Test-Path -LiteralPath $rawPath) {
        (Get-Item -LiteralPath $rawPath).Length
    } else {
        0
    }

    $k6CpuPercent = 0
    $backendCpuPercent = 0
    if ($null -ne $previousSampleAt) {
        $wallSeconds = [Math]::Max(0.001, ($sampleAt - $previousSampleAt).TotalSeconds)
        if ($null -ne $k6 -and $null -ne $previousK6Cpu) {
            $k6CpuPercent = [Math]::Round((($k6.CpuSeconds - $previousK6Cpu) / $wallSeconds / $processorCount) * 100, 2)
        }
        if ($null -ne $backend -and $null -ne $previousBackendCpu) {
            $backendCpuPercent = [Math]::Round((($backend.CpuSeconds - $previousBackendCpu) / $wallSeconds / $processorCount) * 100, 2)
        }
    }

    $row = [pscustomobject]@{
        timestamp = $sampleAt.ToString('o')
        elapsed_seconds = $elapsed
        k6_running = $null -ne $k6
        backend_running = $null -ne $backend
        k6_cpu_percent = $k6CpuPercent
        backend_cpu_percent = $backendCpuPercent
        k6_working_set_mb = if ($null -ne $k6) { $k6.WorkingSetMb } else { 0 }
        backend_working_set_mb = if ($null -ne $backend) { $backend.WorkingSetMb } else { 0 }
        available_memory_mb = Get-AvailableMemoryMb
        raw_result_bytes = $rawBytes
    }

    if (Test-Path -LiteralPath $output) {
        $row | Export-Csv -LiteralPath $output -NoTypeInformation -Append -Encoding utf8
    } else {
        $row | Export-Csv -LiteralPath $output -NoTypeInformation -Encoding utf8
    }

    if ($null -eq $k6) {
        break
    }

    $previousK6Cpu = $k6.CpuSeconds
    $previousBackendCpu = if ($null -ne $backend) { $backend.CpuSeconds } else { $null }
    $previousSampleAt = $sampleAt
    Start-Sleep -Seconds $IntervalSeconds
}
