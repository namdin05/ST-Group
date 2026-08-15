param(
    [Parameter(Mandatory = $true)]
    [string]$StatePath,

    [Parameter(Mandatory = $true)]
    [int]$K6ProcessId,

    [Parameter(Mandatory = $true)]
    [string]$Phase
)

$ErrorActionPreference = 'Stop'
$Host.UI.RawUI.WindowTitle = "HW05 Endurance Resource Evidence - $Phase"
$state = Get-Content -Raw -LiteralPath $StatePath | ConvertFrom-Json
$started = [datetimeoffset]::Parse($state.enduranceStartedAt)
$elapsed = ([datetimeoffset]::Now - $started).TotalSeconds
$backend = Get-Process -Id $state.backendNodePid -ErrorAction Stop
$k6 = Get-Process -Id $K6ProcessId -ErrorAction Stop
$samples = (Get-Counter `
    '\Processor(_Total)\% Processor Time', `
    '\Memory\Available MBytes').CounterSamples
$totalCpu = ($samples | Where-Object Path -Like '*processor*').CookedValue
$availableMemory = ($samples | Where-Object Path -Like '*memory*').CookedValue
$raw = Join-Path $state.resultDir "raw\23127430_Endurance_$($state.runId).json"
$rawBytes = if (Test-Path -LiteralPath $raw) { (Get-Item -LiteralPath $raw).Length } else { 0 }
$capturedAt = [datetimeoffset]::Now
$samplePath = Join-Path $state.resultDir "23127430_Endurance_$($state.runId)_resources.csv"

$row = [pscustomobject]@{
    CapturedAt = $capturedAt.ToString('o')
    Phase = $Phase
    ElapsedSeconds = [math]::Round($elapsed, 1)
    TotalCPUPercent = [math]::Round($totalCpu, 2)
    AvailableMemoryMB = [math]::Round($availableMemory, 0)
    NodeCPUSeconds = [math]::Round($backend.CPU, 3)
    NodeWorkingSetMB = [math]::Round($backend.WorkingSet64 / 1MB, 2)
    K6CPUSeconds = [math]::Round($k6.CPU, 3)
    K6WorkingSetMB = [math]::Round($k6.WorkingSet64 / 1MB, 2)
    RawJsonBytes = $rawBytes
}

if (Test-Path -LiteralPath $samplePath) {
    $row | Export-Csv -LiteralPath $samplePath -Append -NoTypeInformation -Encoding utf8
} else {
    $row | Export-Csv -LiteralPath $samplePath -NoTypeInformation -Encoding utf8
}

Clear-Host
Write-Host 'HW05 - LIVE ENDURANCE RESOURCE EVIDENCE' -ForegroundColor Cyan
Write-Host "Phase: $Phase"
Write-Host ("Elapsed: {0:N1} seconds" -f $elapsed)
Write-Host ("Total CPU: {0:N2}%" -f $totalCpu)
Write-Host ("Available memory: {0:N0} MB" -f $availableMemory)
Write-Host ("Raw k6 JSON size: {0:N0} bytes" -f $rawBytes)
Write-Host ''

@($backend, $k6) |
    Select-Object Id, ProcessName,
        @{Name = 'CPUSeconds'; Expression = { [math]::Round($_.CPU, 3) }},
        @{Name = 'WorkingSetMB'; Expression = {
            [math]::Round($_.WorkingSet64 / 1MB, 2)
        }} |
    Format-Table -AutoSize

Write-Host 'Backend PID owns listening port 3000.'
Write-Host 'k6 PID is the active 20-VU / 12-minute-hold Endurance generator.'
Write-Host "Sample appended to: $samplePath"
Read-Host 'Evidence ready - press Enter to close'
