param(
    [Parameter(Mandatory = $true)]
    [string]$StatePath,

    [Parameter(Mandatory = $true)]
    [string]$Phase,

    [string]$SummaryPath = '',

    [ValidateSet('RUNNING', 'PASS', 'FAIL', 'READY')]
    [string]$Status = 'RUNNING'
)

$ErrorActionPreference = 'Stop'
$state = Get-Content -Raw -LiteralPath $StatePath | ConvertFrom-Json
$resourcePath = Join-Path $state.resultDir 'endurance-resource-samples.csv'
$output = Join-Path $state.resultDir 'evidence-live.html'
$samples = @()
if (Test-Path -LiteralPath $resourcePath) {
    $samples = @(Import-Csv -LiteralPath $resourcePath)
}
$latest = if ($samples.Count -gt 0) { $samples[-1] } else { $null }

function HtmlEncode([object]$Value) {
    [System.Net.WebUtility]::HtmlEncode([string]$Value)
}

function MetricValue([object]$Value, [string]$Format = 'N2') {
    if ($null -eq $Value) { return 'n/a' }
    ([double]$Value).ToString($Format)
}

$statusClass = $Status.ToLowerInvariant()
$updated = (Get-Date).ToString('yyyy-MM-dd HH:mm:ss zzz')
$elapsed = if ($null -ne $latest) { "$(MetricValue $latest.elapsed_seconds 'N0') s" } else { 'not sampled' }
$k6WorkingSet = if ($null -ne $latest) { "$(MetricValue $latest.k6_working_set_mb) MB" } else { 'n/a' }
$backendWorkingSet = if ($null -ne $latest) { "$(MetricValue $latest.backend_working_set_mb) MB" } else { 'n/a' }
$availableMemory = if ($null -ne $latest) { "$(MetricValue $latest.available_memory_mb 'N0') MB" } else { 'n/a' }
$rawSize = if ($null -ne $latest) { "$(MetricValue ([double]$latest.raw_result_bytes / 1MB)) MB" } else { 'n/a' }

$summarySection = '<p class="muted">The k6 summary is not available yet; execution is still in progress.</p>'
if ($SummaryPath -and (Test-Path -LiteralPath $SummaryPath)) {
    $summary = Get-Content -Raw -LiteralPath $SummaryPath | ConvertFrom-Json
    $metrics = $summary.metrics
    $httpFailed = MetricValue ([double]$metrics.http_req_failed.value * 100) 'N4'
    $functionalFailed = MetricValue ([double]$metrics.functional_failures.value * 100) 'N4'
    $summarySection = @"
<div class="metrics six">
  <div class="card"><span>Iterations</span><strong>$(HtmlEncode $metrics.iterations.count)</strong></div>
  <div class="card"><span>HTTP requests</span><strong>$(HtmlEncode $metrics.http_reqs.count)</strong></div>
  <div class="card"><span>Throughput</span><strong>$(MetricValue $metrics.http_reqs.rate 'N4') req/s</strong></div>
  <div class="card"><span>HTTP p95</span><strong>$(MetricValue $metrics.http_req_duration.'p(95)') ms</strong></div>
  <div class="card"><span>HTTP failures</span><strong>$httpFailed%</strong></div>
  <div class="card"><span>Functional failures</span><strong>$functionalFailed%</strong></div>
</div>
"@
}

$recentRows = ''
foreach ($sample in @($samples | Select-Object -Last 8)) {
    $recentRows += @"
<tr><td>$(HtmlEncode ([DateTimeOffset]::Parse($sample.timestamp).ToString('HH:mm:ss')))</td><td>$(HtmlEncode $sample.elapsed_seconds)</td><td>$(HtmlEncode $sample.k6_working_set_mb)</td><td>$(HtmlEncode $sample.backend_working_set_mb)</td><td>$(HtmlEncode $sample.available_memory_mb)</td><td>$(HtmlEncode $sample.raw_result_bytes)</td></tr>
"@
}
if (-not $recentRows) {
    $recentRows = '<tr><td colspan="6" class="muted">Waiting for the first resource sample.</td></tr>'
}

$html = @"
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>HW05 Endurance Evidence — 23127430</title>
<style>
:root{color-scheme:dark;--bg:#07111f;--panel:#101f32;--border:#28405b;--text:#edf6ff;--muted:#94abc3;--cyan:#4bd5ff;--green:#4ade80;--red:#fb7185;--amber:#fbbf24}*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at 80% 0,#18365a 0,transparent 36%),var(--bg);color:var(--text);font:15px/1.45 "Segoe UI",sans-serif}.wrap{max-width:1380px;margin:auto;padding:32px}header{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;border-bottom:1px solid var(--border);padding-bottom:22px}h1{font-size:34px;margin:5px 0 8px;letter-spacing:-.5px}.eyebrow{color:var(--cyan);font-weight:700;text-transform:uppercase;letter-spacing:1.8px;font-size:12px}.muted{color:var(--muted)}.badge{padding:9px 16px;border-radius:999px;font-weight:800;letter-spacing:.8px;background:#17314b;border:1px solid #366185}.badge.pass{background:#0d3828;border-color:#1f8c5d;color:#a7f3d0}.badge.fail{background:#4c1720;border-color:#a43a4d;color:#fecdd3}.badge.running{background:#3f3210;border-color:#9a7716;color:#fde68a}.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:20px 0}.metrics.six{grid-template-columns:repeat(6,1fr)}.card,.section{background:linear-gradient(180deg,rgba(20,39,61,.95),rgba(11,26,43,.96));border:1px solid var(--border);border-radius:14px;box-shadow:0 12px 30px rgba(0,0,0,.16)}.card{padding:17px}.card span{display:block;color:var(--muted);font-size:12px;text-transform:uppercase;letter-spacing:.7px;margin-bottom:7px}.card strong{font-size:21px}.section{padding:22px;margin-top:18px}.section h2{font-size:17px;margin:0 0 13px}.profile{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}.step{padding:14px;border-left:3px solid var(--cyan);background:#0b192a;border-radius:7px}.step b{display:block;font-size:18px}.step small{color:var(--muted)}table{width:100%;border-collapse:collapse;font-variant-numeric:tabular-nums}th,td{text-align:right;padding:9px 11px;border-bottom:1px solid #233950}th:first-child,td:first-child{text-align:left}th{color:#a9c3dc;font-size:12px;text-transform:uppercase}.footer{display:flex;justify-content:space-between;color:var(--muted);font-size:12px;margin-top:20px}@media(max-width:900px){.metrics,.metrics.six,.profile{grid-template-columns:1fr 1fr}.wrap{padding:18px}} 
</style>
</head>
<body><main class="wrap">
<header><div><div class="eyebrow">HW05 · Performance Testing · Live evidence</div><h1>Endurance Test — WF01</h1><div class="muted">Student 23127430 · Run $(HtmlEncode $state.runId) · Isolated disposable SQLite runtime</div></div><div class="badge $statusClass">$(HtmlEncode $Status)</div></header>
<section class="section"><h2>Current checkpoint</h2><div style="font-size:24px;font-weight:700">$(HtmlEncode $Phase)</div><div class="muted">Updated $updated · sample elapsed $elapsed</div></section>
<div class="metrics"><div class="card"><span>k6 working set</span><strong>$k6WorkingSet</strong></div><div class="card"><span>Backend working set</span><strong>$backendWorkingSet</strong></div><div class="card"><span>Available memory</span><strong>$availableMemory</strong></div><div class="card"><span>Raw evidence size</span><strong>$rawSize</strong></div></div>
<section class="section"><h2>Selected workload profile</h2><div class="profile"><div class="step"><b>1 minute</b><small>Ramp 1 → 20 VUs</small></div><div class="step"><b>12 minutes</b><small>Sustained hold at 20 VUs</small></div><div class="step"><b>1 minute</b><small>Controlled ramp-down to 0</small></div></div><p class="muted">20 VUs stays below the 50-account test-data ceiling and exercises the same correlated Browse → Detail → Cart → Checkout → Orders workflow used by Load and Stress.</p></section>
<section class="section"><h2>k6 result summary</h2>$summarySection</section>
<section class="section"><h2>Latest operating-system resource samples</h2><table><thead><tr><th>Time</th><th>Elapsed (s)</th><th>k6 WS (MB)</th><th>Backend WS (MB)</th><th>Available MB</th><th>Raw bytes</th></tr></thead><tbody>$recentRows</tbody></table></section>
<div class="footer"><span>Source DB SHA-256: $(HtmlEncode $state.sourceDbHashBefore)</span><span>Generated from live PIDs and k6 artifacts</span></div>
</main></body></html>
"@

$html | Set-Content -LiteralPath $output -Encoding utf8
Write-Output $output
