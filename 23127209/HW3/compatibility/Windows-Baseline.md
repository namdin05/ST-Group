# Scenario D Compatibility Matrix

Status: **Windows Chromium desktop complete; remaining environments pending**

No unsupported environment is marked Pass.

| Cell ID | Screen | OS | Browser | Device | Viewport | Result | Evidence | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| WIN-01 | D1 | Windows | Chromium (in-app) | Desktop | 1280×720 | Fail | [`WIN-01-D1-Chromium-desktop.png`](../evidence/compatibility/WIN-01-D1-Chromium-desktop.png) | D-F01/D-F02 |
| WIN-02 | D2 | Windows | Chromium (in-app) | Desktop | 1280×720 | Fail | [`WIN-02-D2-Chromium-desktop.png`](../evidence/compatibility/WIN-02-D2-Chromium-desktop.png) | D-F06/D-F09 |
| WIN-03 | D3 | Windows | Chromium (in-app) | Desktop | 1280×720 | Fail | [`WIN-03-D3-Chromium-desktop.png`](../evidence/compatibility/WIN-03-D3-Chromium-desktop.png) | D-F03 |
| WIN-04 | D4 | Windows | Chromium (in-app) | Desktop | 1280×720 | Fail | [`WIN-04-D4-Chromium-desktop.png`](../evidence/compatibility/WIN-04-D4-Chromium-desktop.png) | D-F04/D-F05 |

Each compatibility image contains an overlay with the student email, environment,
screen ID, and execution date.

## Required expansion

For every D1–D4 screen, the assignment still requires enough genuine runs to reach:

- at least 3 operating systems;
- at least 5 browsers;
- desktop, tablet, and phone device classes.

This cannot be completed truthfully from the current Windows Chromium environment.
BrowserStack, LambdaTest, physical devices, VMs, or equivalent real environments
are acceptable ways to collect the missing evidence later.
