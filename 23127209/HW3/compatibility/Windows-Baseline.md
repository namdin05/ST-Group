# Scenario D Compatibility Matrix

Status: **Four supplemental Windows Chromium baselines recorded; 24 target cells Pending**

The in-app Chromium observations are useful baselines but do not count as genuine
Google Chrome runs. No unexecuted target environment is marked Pass or Fail.

## Target matrix

Use the latest stable browser available at execution time and record its exact
version. Every screenshot must show the student email overlay, screen, OS, browser,
device class, viewport/device, date, and result.

| Cell ID | Screen | OS | Browser | Device class | Viewport / Device | Version | Result | Evidence | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CMP-D1-01 | D1 | Windows 11 | Chrome | Desktop | 1440x900 | TBD | Pending | TBD | Not executed |
| CMP-D1-02 | D1 | Windows 11 | Edge | Desktop | 1366x768 | TBD | Pending | TBD | Not executed |
| CMP-D1-03 | D1 | Windows 11 | Firefox | Desktop | 1280x720 | TBD | Pending | TBD | Not executed |
| CMP-D1-04 | D1 | Windows 11 | Opera | Desktop | 1280x720 | TBD | Pending | TBD | Not executed |
| CMP-D1-05 | D1 | Android | Chrome | Phone | Pixel 8 | TBD | Pending | TBD | Not executed |
| CMP-D1-06 | D1 | iPadOS | Safari | Tablet | iPad Air | TBD | Pending | TBD | Not executed |
| CMP-D2-01 | D2 | Windows 11 | Chrome | Desktop | 1440x900 | TBD | Pending | TBD | Not executed |
| CMP-D2-02 | D2 | Windows 11 | Edge | Desktop | 1366x768 | TBD | Pending | TBD | Not executed |
| CMP-D2-03 | D2 | Windows 11 | Firefox | Desktop | 1280x720 | TBD | Pending | TBD | Not executed |
| CMP-D2-04 | D2 | Windows 11 | Opera | Desktop | 1280x720 | TBD | Pending | TBD | Not executed |
| CMP-D2-05 | D2 | Android | Chrome | Phone | Pixel 8 | TBD | Pending | TBD | Not executed |
| CMP-D2-06 | D2 | iPadOS | Safari | Tablet | iPad Air | TBD | Pending | TBD | Not executed |
| CMP-D3-01 | D3 | Windows 11 | Chrome | Desktop | 1440x900 | TBD | Pending | TBD | Not executed |
| CMP-D3-02 | D3 | Windows 11 | Edge | Desktop | 1366x768 | TBD | Pending | TBD | Not executed |
| CMP-D3-03 | D3 | Windows 11 | Firefox | Desktop | 1280x720 | TBD | Pending | TBD | Not executed |
| CMP-D3-04 | D3 | Windows 11 | Opera | Desktop | 1280x720 | TBD | Pending | TBD | Not executed |
| CMP-D3-05 | D3 | Android | Chrome | Phone | Pixel 8 | TBD | Pending | TBD | Not executed |
| CMP-D3-06 | D3 | iPadOS | Safari | Tablet | iPad Air | TBD | Pending | TBD | Not executed |
| CMP-D4-01 | D4 | Windows 11 | Chrome | Desktop | 1440x900 | TBD | Pending | TBD | Not executed |
| CMP-D4-02 | D4 | Windows 11 | Edge | Desktop | 1366x768 | TBD | Pending | TBD | Not executed |
| CMP-D4-03 | D4 | Windows 11 | Firefox | Desktop | 1280x720 | TBD | Pending | TBD | Not executed |
| CMP-D4-04 | D4 | Windows 11 | Opera | Desktop | 1280x720 | TBD | Pending | TBD | Not executed |
| CMP-D4-05 | D4 | Android | Chrome | Phone | Pixel 8 | TBD | Pending | TBD | Not executed |
| CMP-D4-06 | D4 | iPadOS | Safari | Tablet | iPad Air | TBD | Pending | TBD | Not executed |

For each screen, the planned rows cover three operating systems (Windows, Android,
iPadOS), five browsers (Chrome, Edge, Firefox, Opera, Safari), and all three device
classes (desktop, phone, tablet).

## Supplemental Windows baseline

| Cell ID | Screen | OS | Browser | Device | Viewport | Result | Evidence | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| WIN-01 | D1 | Windows | Chromium (in-app) | Desktop | 1280x720 | Fail | [`WIN-01-D1-Chromium-desktop.png`](../evidence/compatibility/WIN-01-D1-Chromium-desktop.png) | D-F01/D-F02 |
| WIN-02 | D2 | Windows | Chromium (in-app) | Desktop | 1280x720 | Fail | [`WIN-02-D2-Chromium-desktop.png`](../evidence/compatibility/WIN-02-D2-Chromium-desktop.png) | D-F06/D-F09 |
| WIN-03 | D3 | Windows | Chromium (in-app) | Desktop | 1280x720 | Fail | [`WIN-03-D3-Chromium-desktop.png`](../evidence/compatibility/WIN-03-D3-Chromium-desktop.png) | D-F03 |
| WIN-04 | D4 | Windows | Chromium (in-app) | Desktop | 1280x720 | Fail | [`WIN-04-D4-Chromium-desktop.png`](../evidence/compatibility/WIN-04-D4-Chromium-desktop.png) | D-F04/D-F05 |

## Execution rule

1. Open the real environment and record browser/OS versions.
2. Exercise the screen's primary task, navigation, input, status, and attachment behavior.
3. Save one email-overlaid screenshot per cell, even when the result is Pass.
4. Mark Fail when a reproducible GUI/behavior difference is observed and link a finding.
5. Leave the cell Pending when the run or evidence is incomplete.
