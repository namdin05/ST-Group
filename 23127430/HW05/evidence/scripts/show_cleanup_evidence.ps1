param(
    [Parameter(Mandatory = $true)]
    [string]$StatePath
)

$ErrorActionPreference = 'Stop'
$Host.UI.RawUI.WindowTitle = 'HW05 Isolation and Cleanup Evidence'
$state = Get-Content -Raw -LiteralPath $StatePath | ConvertFrom-Json
$sourceDatabase = Join-Path $state.repo 'src\backend\database.sqlite'
$runtimeDatabase = Join-Path $state.runtime 'database.sqlite'

$hashAfter = (Get-FileHash -Algorithm SHA256 -LiteralPath $sourceDatabase).Hash
$hashMatches = $state.sourceDbHashBefore -eq $hashAfter
$sourceUsers = (& sqlite3 $sourceDatabase 'SELECT COUNT(*) FROM users;').Trim()
$disposableOrders = (& sqlite3 $runtimeDatabase 'SELECT COUNT(*) FROM orders;').Trim()
$port3000Closed = -not [bool](Get-NetTCPConnection -State Listen -LocalPort 3000 -ErrorAction SilentlyContinue)
$port8765Closed = -not [bool](Get-NetTCPConnection -State Listen -LocalPort 8765 -ErrorAction SilentlyContinue)
$passed = $hashMatches -and $sourceUsers -eq '119' -and $port3000Closed -and $port8765Closed

Clear-Host
Write-Host 'HW05 - DATABASE ISOLATION AND CLEANUP EVIDENCE' -ForegroundColor Cyan
Write-Host ''
Write-Host "Source database SHA-256 before: $($state.sourceDbHashBefore)"
Write-Host "Source database SHA-256 after : $hashAfter"
Write-Host "Source database hashes match  : $(if ($hashMatches) { 'PASS' } else { 'FAIL' })"
Write-Host "Source users remain            : $sourceUsers"
Write-Host "Orders in disposable database  : $disposableOrders"
Write-Host "Port 3000 closed               : $(if ($port3000Closed) { 'PASS' } else { 'FAIL' })"
Write-Host "Port 8765 closed               : $(if ($port8765Closed) { 'PASS' } else { 'FAIL' })"
Write-Host ''
Write-Host "ISOLATION / CLEANUP VERDICT     : $(if ($passed) { 'PASS' } else { 'FAIL' })" `
    -ForegroundColor $(if ($passed) { 'Green' } else { 'Red' })
Write-Host ''
Read-Host 'Evidence ready - press Enter to close'

