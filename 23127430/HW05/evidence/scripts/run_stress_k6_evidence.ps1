param(
    [Parameter(Mandatory = $true)]
    [string]$StatePath,

    [ValidateSet('dry-run', 'stress')]
    [string]$Mode
)

$ErrorActionPreference = 'Stop'
$state = Get-Content -Raw -LiteralPath $StatePath | ConvertFrom-Json
$script = Join-Path $state.repo 'test-plans\stress\23127430_Stress_20260815.js'
$rawDir = Join-Path $state.resultDir 'raw'
$htmlDir = Join-Path $state.resultDir 'html'
$baseName = if ($Mode -eq 'dry-run') {
    "23127430_Stress_$($state.runId)_dry-run"
} else {
    "23127430_Stress_$($state.runId)"
}
$raw = Join-Path $rawDir "$baseName.json"
$summary = Join-Path $rawDir "${baseName}_summary.json"
$console = Join-Path $rawDir "${baseName}_console.log"
$marker = Join-Path $state.resultDir "$Mode.complete"

$Host.UI.RawUI.WindowTitle = if ($Mode -eq 'dry-run') {
    'HW05 k6 Stress Dry Run Evidence'
} else {
    'HW05 k6 Full Stress Evidence'
}

Set-Location -LiteralPath $state.repo
if ($Mode -eq 'stress') {
    $env:K6_WEB_DASHBOARD = 'true'
    $env:K6_WEB_DASHBOARD_EXPORT = Join-Path $htmlDir "$baseName.html"
    $env:K6_WEB_DASHBOARD_PERIOD = '1s'
}

k6.exe run `
    -e "RUN_MODE=$Mode" `
    -e 'BASE_URL=http://127.0.0.1:3000' `
    --out "json=$raw" `
    --summary-export $summary `
    $script `
    2>&1 | Tee-Object -LiteralPath $console

$k6Exit = $LASTEXITCODE
Remove-Item Env:K6_WEB_DASHBOARD -ErrorAction SilentlyContinue
Remove-Item Env:K6_WEB_DASHBOARD_EXPORT -ErrorAction SilentlyContinue
Remove-Item Env:K6_WEB_DASHBOARD_PERIOD -ErrorAction SilentlyContinue

if (-not (Test-Path -LiteralPath $summary)) {
    throw "k6 summary export is missing; exit code $k6Exit."
}

$result = Get-Content -Raw -LiteralPath $summary | ConvertFrom-Json
$metrics = $result.metrics
$httpThresholdPassed = $metrics.http_req_failed.value -lt 0.05 -and
    -not $metrics.http_req_failed.thresholds.'rate<0.05'
$functionalThresholdPassed = $metrics.functional_failures.value -lt 0.01 -and
    -not $metrics.functional_failures.thresholds.'rate<0.01'
$latencyThresholdPassed = $metrics.http_req_duration.'p(95)' -lt 1000 -and
    -not $metrics.http_req_duration.thresholds.'p(95)<1000'
$checksThresholdPassed = $metrics.checks.value -gt 0.99 -and
    -not $metrics.checks.thresholds.'rate>0.99'
$passed = $k6Exit -eq 0 -and $httpThresholdPassed -and
    $functionalThresholdPassed -and $latencyThresholdPassed -and
    $checksThresholdPassed

$verdict = if ($passed) { 'PASS' } else { 'FAIL' }
$verdict | Set-Content -LiteralPath $marker -Encoding ascii

Clear-Host
Write-Host 'HW05 - k6 STRESS EXECUTION EVIDENCE' -ForegroundColor Cyan
Write-Host "Profile: $Mode"
Write-Host "k6 exit code: $k6Exit"
Write-Host "HTTP failure threshold (<5%): $(if ($httpThresholdPassed) {'PASS'} else {'FAIL'})"
Write-Host "Functional threshold (<1%): $(if ($functionalThresholdPassed) {'PASS'} else {'FAIL'})"
Write-Host "Latency threshold (p95 < 1000 ms): $(if ($latencyThresholdPassed) {'PASS'} else {'FAIL'})"
Write-Host "Check-rate threshold (>99%): $(if ($checksThresholdPassed) {'PASS'} else {'FAIL'})"
Write-Host ''
Write-Host "Iterations: $($metrics.iterations.count)"
Write-Host "HTTP requests: $($metrics.http_reqs.count)"
Write-Host "Checks passed: $($metrics.checks.passes)"
Write-Host "Checks failed: $($metrics.checks.fails)"
Write-Host ("HTTP avg: {0:N2} ms" -f $metrics.http_req_duration.avg)
Write-Host ("HTTP p95: {0:N2} ms" -f $metrics.http_req_duration.'p(95)')
Write-Host ("HTTP max: {0:N2} ms" -f $metrics.http_req_duration.max)
Write-Host ("Throughput: {0:N4} requests/s" -f $metrics.http_reqs.rate)
Write-Host ''
Write-Host "OVERALL: $(if ($passed) {'PASS'} else {'FAIL'})" `
    -ForegroundColor $(if ($passed) {'Green'} else {'Red'})
Write-Host 'Values above are read directly from k6 summary-export JSON.'
Read-Host 'Evidence ready - press Enter to close'

