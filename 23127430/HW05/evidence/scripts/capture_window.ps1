param(
    [Parameter(Mandatory = $true)]
    [int]$ProcessId,

    [Parameter(Mandatory = $true)]
    [string]$OutputPath,

    [int]$DelayMilliseconds = 1200,

    [switch]$Maximize,

    [int]$CropLeft = 0,

    [int]$CropTop = 0,

    [int]$CropWidth = 0,

    [int]$CropHeight = 0,

    [switch]$UsePrintWindow,

    [switch]$ForceTopmost
)

$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing
Add-Type @'
using System;
using System.Runtime.InteropServices;

public static class WindowCaptureNative
{
    [StructLayout(LayoutKind.Sequential)]
    public struct RECT
    {
        public int Left;
        public int Top;
        public int Right;
        public int Bottom;
    }

    [DllImport("user32.dll")]
    public static extern bool GetWindowRect(IntPtr hWnd, out RECT rect);

    [DllImport("user32.dll")]
    public static extern bool SetForegroundWindow(IntPtr hWnd);

    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, int command);

    [DllImport("user32.dll")]
    public static extern bool SetProcessDPIAware();

    [DllImport("user32.dll")]
    public static extern bool PrintWindow(IntPtr hWnd, IntPtr hdc, uint flags);

    [DllImport("user32.dll")]
    public static extern bool BringWindowToTop(IntPtr hWnd);

    [DllImport("user32.dll")]
    public static extern bool SetWindowPos(
        IntPtr hWnd,
        IntPtr hWndInsertAfter,
        int x,
        int y,
        int width,
        int height,
        uint flags
    );
}
'@

[WindowCaptureNative]::SetProcessDPIAware() | Out-Null

$deadline = (Get-Date).AddSeconds(15)
do {
    $process = Get-Process -Id $ProcessId -ErrorAction Stop
    $process.Refresh()
    $handle = $process.MainWindowHandle
    if ($handle -eq [IntPtr]::Zero) {
        Start-Sleep -Milliseconds 250
    }
} until ($handle -ne [IntPtr]::Zero -or (Get-Date) -gt $deadline)

if ($handle -eq [IntPtr]::Zero) {
    throw "Process $ProcessId does not expose a capturable main window."
}

$showCommand = if ($Maximize) { 3 } else { 9 }
[WindowCaptureNative]::ShowWindow($handle, $showCommand) | Out-Null
[WindowCaptureNative]::SetForegroundWindow($handle) | Out-Null
if ($ForceTopmost) {
    $topmost = [IntPtr](-1)
    $noMoveNoSizeShow = 0x0001 -bor 0x0002 -bor 0x0040
    [WindowCaptureNative]::SetWindowPos(
        $handle,
        $topmost,
        0,
        0,
        0,
        0,
        $noMoveNoSizeShow
    ) | Out-Null
    [WindowCaptureNative]::BringWindowToTop($handle) | Out-Null
}
Start-Sleep -Milliseconds $DelayMilliseconds

$rect = New-Object WindowCaptureNative+RECT
if (-not [WindowCaptureNative]::GetWindowRect($handle, [ref]$rect)) {
    throw "Unable to read window bounds for process $ProcessId."
}

$width = $rect.Right - $rect.Left
$height = $rect.Bottom - $rect.Top
if ($width -lt 100 -or $height -lt 100) {
    throw "Invalid window bounds ${width}x${height} for process $ProcessId."
}

if ($CropWidth -gt 0 -or $CropHeight -gt 0) {
    if ($CropWidth -le 0 -or $CropHeight -le 0) {
        throw 'CropWidth and CropHeight must both be positive when cropping.'
    }
    if (
        $CropLeft -lt 0 -or $CropTop -lt 0 -or
        $CropLeft + $CropWidth -gt $width -or
        $CropTop + $CropHeight -gt $height
    ) {
        throw "Crop rectangle is outside the ${width}x${height} window."
    }
    $rect.Left += $CropLeft
    $rect.Top += $CropTop
    $width = $CropWidth
    $height = $CropHeight
}

$resolvedOutput = [IO.Path]::GetFullPath($OutputPath)
$outputDirectory = Split-Path -Parent $resolvedOutput
if (-not (Test-Path -LiteralPath $outputDirectory)) {
    New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
}

$bitmap = New-Object Drawing.Bitmap $width, $height
$graphics = [Drawing.Graphics]::FromImage($bitmap)
try {
    if ($UsePrintWindow) {
        if ($CropWidth -gt 0 -or $CropHeight -gt 0) {
            throw 'PrintWindow mode does not support crop parameters.'
        }
        $deviceContext = $graphics.GetHdc()
        try {
            if (-not [WindowCaptureNative]::PrintWindow($handle, $deviceContext, 2)) {
                throw "PrintWindow failed for process $ProcessId."
            }
        } finally {
            $graphics.ReleaseHdc($deviceContext)
        }
    } else {
        $graphics.CopyFromScreen(
            $rect.Left,
            $rect.Top,
            0,
            0,
            (New-Object Drawing.Size $width, $height),
            [Drawing.CopyPixelOperation]::SourceCopy
        )
    }
    $bitmap.Save($resolvedOutput, [Drawing.Imaging.ImageFormat]::Png)
} finally {
    $graphics.Dispose()
    $bitmap.Dispose()
    if ($ForceTopmost) {
        $notTopmost = [IntPtr](-2)
        $noMoveNoSize = 0x0001 -bor 0x0002
        [WindowCaptureNative]::SetWindowPos(
            $handle,
            $notTopmost,
            0,
            0,
            0,
            0,
            $noMoveNoSize
        ) | Out-Null
    }
}

$file = Get-Item -LiteralPath $resolvedOutput
[pscustomobject]@{
    ProcessId = $ProcessId
    WindowTitle = $process.MainWindowTitle
    Path = $file.FullName
    Width = $width
    Height = $height
    Bytes = $file.Length
}
