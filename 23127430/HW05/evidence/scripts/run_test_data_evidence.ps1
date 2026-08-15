param(
    [Parameter(Mandatory = $true)]
    [string]$StatePath,

    [string]$MarkerName = 'provision.complete'
)

$ErrorActionPreference = 'Stop'
$Host.UI.RawUI.WindowTitle = 'HW05 Test Data Evidence'
$state = Get-Content -Raw -LiteralPath $StatePath | ConvertFrom-Json
$database = Join-Path $state.runtime 'database.sqlite'
$marker = Join-Path $state.resultDir $MarkerName

Set-Location -LiteralPath $state.repo
Write-Host 'HW05 - TEST DATA VALIDATION AND PROVISIONING' -ForegroundColor Cyan
Write-Host 'Target: disposable SQLite database' -ForegroundColor Green
Write-Host ''

node.exe .\test-data\manage_test_data.js
if ($LASTEXITCODE -ne 0) { throw 'CSV validation failed.' }

node.exe .\test-data\manage_test_data.js `
    --verify-products `
    --database $database
if ($LASTEXITCODE -ne 0) { throw 'Product verification failed.' }

node.exe .\test-data\manage_test_data.js `
    --provision-users `
    --database $database `
    --confirm-disposable
if ($LASTEXITCODE -ne 0) { throw 'Synthetic user provisioning failed.' }

'PASS' | Set-Content -LiteralPath $marker -Encoding ascii
Write-Host ''
Write-Host 'TEST DATA GATE: PASS' -ForegroundColor Green
Read-Host 'Evidence ready - press Enter to close'

