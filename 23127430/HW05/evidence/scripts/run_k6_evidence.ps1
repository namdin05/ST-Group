param(
    [Parameter(Mandatory = $true)]
    [string]$StatePath,

    [ValidateSet('dry-run', 'load')]
    [string]$Mode
)

$ErrorActionPreference = 'Stop'
$state = Get-Content -Raw -LiteralPath $StatePath | ConvertFrom-Json
$script = Join-Path $state.repo 'test-plans\load\23127430_Load_20260814.js'
$rawDir = Join-Path $state.resultDir 'raw'
$htmlDir = Join-Path $state.resultDir 'html'
$baseName = if ($Mode -eq 'dry-run') {
    "23127430_Load_$($state.runId)_dry-run"
} else {
    "23127430_Load_$($state.runId)"
}
$raw = Join-Path $rawDir "$baseName.json"
$summary = Join-Path $rawDir "${baseName}_summary.json"
$console = Join-Path $rawDir "${baseName}_console.log"
$marker = Join-Path $state.resultDir "$Mode.complete"

$Host.UI.RawUI.WindowTitle = if ($Mode -eq 'dry-run') {
    'HW05 k6 Dry Run Evidence'
} else {
    'HW05 k6 Full Load Evidence'
}

Set-Location -LiteralPath $state.repo
if ($Mode -eq 'load') {
    $env:K6_WEB_DASHBOARD = 'true'
    $env:K6_WEB_DASHBOARD_EXPORT = Join-Path $htmlDir "$baseName.html"
    $env:K6_WEB_DASHBOARD_PERIOD = '2s'
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
$httpThresholdPassed = $metrics.http_req_failed.value -eq 0 -and
    -not $metrics.http_req_failed.thresholds.'rate<0.01'
$functionalThresholdPassed = $metrics.functional_failures.value -eq 0 -and
    -not $metrics.functional_failures.thresholds.'rate==0'
$passed = $k6Exit -eq 0 -and $httpThresholdPassed -and
    $functionalThresholdPassed -and $metrics.checks.fails -eq 0

$verdict = if ($passed) { 'PASS' } else { 'FAIL' }
$verdict | Set-Content -LiteralPath $marker -Encoding ascii

Clear-Host
Write-Host 'HW05 - k6 EXECUTION EVIDENCE' -ForegroundColor Cyan
Write-Host "Profile: $Mode"
Write-Host "k6 exit code: $k6Exit"
Write-Host "HTTP threshold (<1%): $(if ($httpThresholdPassed) {'PASS'} else {'FAIL'})"
Write-Host "Functional threshold (0%): $(if ($functionalThresholdPassed) {'PASS'} else {'FAIL'})"
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
