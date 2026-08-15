param(
    [Parameter(Mandatory = $true)]
    [string]$StatePath
)

$ErrorActionPreference = 'Stop'
$Host.UI.RawUI.WindowTitle = 'HW05 Isolation and Cleanup Evidence'
$state = Get-Content -Raw -LiteralPath $StatePath | ConvertFrom-Json
$sourceDatabase = Join-Path $state.repo 'src\backend\database.sqlite'
$runtimeDatabase = Join-Path $state.runtime 'database.sqlite'

$sha256 = [Security.Cryptography.SHA256]::Create()
$sourceStream = [IO.File]::OpenRead($sourceDatabase)
try {
    $hashAfter = ([BitConverter]::ToString($sha256.ComputeHash($sourceStream))).Replace('-', '')
} finally {
    $sourceStream.Dispose()
    $sha256.Dispose()
}
$hashMatches = $state.sourceDbHashBefore -eq $hashAfter
$sourceUsers = (& sqlite3 $sourceDatabase 'SELECT COUNT(*) FROM users;').Trim()
$disposableOrders = (& sqlite3 $runtimeDatabase 'SELECT COUNT(*) FROM orders;').Trim()

function Test-LocalPortClosed([int]$Port) {
    $client = [Net.Sockets.TcpClient]::new()
    try {
        $connection = $client.ConnectAsync('127.0.0.1', $Port)
        if (-not $connection.Wait(1000)) { return $true }
        return -not $client.Connected
    } catch {
        return $true
    } finally {
        $client.Dispose()
    }
}

$port3000Closed = Test-LocalPortClosed 3000
$port8765Closed = Test-LocalPortClosed 8765
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
