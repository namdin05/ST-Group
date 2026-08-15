param(
    [Parameter(Mandatory = $true)]
    [string]$StatePath,

    [string]$Phase = 'hold'
)

$ErrorActionPreference = 'Stop'
$Host.UI.RawUI.WindowTitle = 'HW05 Process Resource Evidence'
$state = Get-Content -Raw -LiteralPath $StatePath | ConvertFrom-Json
$started = [datetimeoffset]::Parse($state.fullStartedAt)
$elapsed = ([datetimeoffset]::Now - $started).TotalSeconds
$connection = Get-NetTCPConnection -LocalPort 3000 -State Listen |
    Select-Object -First 1
$backend = Get-Process -Id $connection.OwningProcess -ErrorAction Stop
$k6 = Get-Process -Id $state.fullK6Pid -ErrorAction Stop
$samples = (Get-Counter `
    '\Processor(_Total)\% Processor Time', `
    '\Memory\Available MBytes').CounterSamples
$totalCpu = ($samples | Where-Object Path -Like '*processor*').CookedValue
$availableMemory = ($samples | Where-Object Path -Like '*memory*').CookedValue

Clear-Host
Write-Host 'HW05 - LIVE PROCESS RESOURCE EVIDENCE' -ForegroundColor Cyan
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

Write-Host 'Backend PID is the owner of listening port 3000.'
Write-Host 'k6 PID is the active Option A load generator.'
Read-Host 'Evidence ready - press Enter to close'

