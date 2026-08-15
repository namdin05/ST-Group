param(
    [Parameter(Mandatory = $true)]
    [string]$StatePath
)

$ErrorActionPreference = 'Stop'
$Host.UI.RawUI.WindowTitle = 'HW05 Disposable Backend Evidence'
$state = Get-Content -Raw -LiteralPath $StatePath | ConvertFrom-Json

Write-Host 'HW05 - DISPOSABLE BACKEND' -ForegroundColor Cyan
Write-Host 'Source: exact copies of server.js and database.js'
Write-Host 'Database: new SQLite file in OS temporary runtime'
Write-Host 'Original source database: NOT USED FOR WRITES' -ForegroundColor Green
Write-Host ''

Set-Location -LiteralPath $state.runtime
node.exe .\server.js

