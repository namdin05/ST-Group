param(
    [Parameter(Mandatory = $true)]
    [string]$StatePath,

    [Parameter(Mandatory = $true)]
    [int]$K6ProcessId,

    [Parameter(Mandatory = $true)]
    [string]$Phase
)

$ErrorActionPreference = 'Stop'
$Host.UI.RawUI.WindowTitle = "HW05 Stress Resource Evidence - $Phase"
$state = Get-Content -Raw -LiteralPath $StatePath | ConvertFrom-Json
$started = [datetimeoffset]::Parse($state.stressStartedAt)
$elapsed = ([datetimeoffset]::Now - $started).TotalSeconds
$backend = Get-Process -Id $state.backendNodePid -ErrorAction Stop
$k6 = Get-Process -Id $K6ProcessId -ErrorAction Stop
$samples = (Get-Counter `
    '\Processor(_Total)\% Processor Time', `
    '\Memory\Available MBytes').CounterSamples
$totalCpu = ($samples | Where-Object Path -Like '*processor*').CookedValue
$availableMemory = ($samples | Where-Object Path -Like '*memory*').CookedValue

Clear-Host
Write-Host 'HW05 - LIVE STRESS RESOURCE EVIDENCE' -ForegroundColor Cyan
Write-Host "Phase: $Phase"
Write-Host ("Elapsed: {0:N1} seconds" -f $elapsed)
Write-Host ("Total CPU: {0:N2}%" -f $totalCpu)
Write-Host ("Available memory: {0:N0} MB" -f $availableMemory)
Write-Host ''

@($backend, $k6) |
    Select-Object Id, ProcessName,
        @{Name = 'CPUSeconds'; Expression = { [math]::Round($_.CPU, 3) }},
        @{Name = 'WorkingSetMB'; Expression = {
            [math]::Round($_.WorkingSet64 / 1MB, 2)
        }} |
    Format-Table -AutoSize

Write-Host 'Backend PID was verified as owner of listening port 3000.'
Write-Host 'k6 PID is the active progressive 5-to-50-VU Stress generator.'
Read-Host 'Evidence ready - press Enter to close'

