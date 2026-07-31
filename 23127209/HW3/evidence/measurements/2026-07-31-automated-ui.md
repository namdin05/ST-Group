# Automated UI Measurements — 2026-07-31

Environment: Windows, authenticated EMS sessions, in-app Chromium.

These are direct DOM/computed-style measurements. They supplement screenshots but
are not presented as evidence of another OS, browser, or physical device.

## Contrast

| Screen | Sample | Foreground / background | Ratio | WCAG normal-text result |
| --- | --- | --- | ---: | --- |
| D1 | Primary submit | white / `rgb(27, 194, 245)` | 2.08:1 | Fail |
| D1 | Helper text | `rgb(161, 161, 170)` / white | 2.56:1 | Fail |
| D1 | Validation error | `rgb(243, 18, 96)` / `rgb(254, 231, 239)` | 3.53:1 | Fail |
| D2 | Create request and active page | white / `rgb(27, 194, 245)` | 2.08:1 | Fail |
| D3 | Active navigation and active page | white / `rgb(27, 194, 245)` | 2.08:1 | Fail |
| D4 | Active navigation | white / `rgb(27, 194, 245)` | 2.08:1 | Fail |

## Reflow at 320 CSS px

| Screen | Content viewport | Document width | Direct observation |
| --- | ---: | ---: | --- |
| D1 | 305 px | 342 px | User header/menu exceeds the viewport |
| D2 | 305 px | 342 px | Horizontal scrollbar and off-screen menu control |
| D3 | 305 px | 516 px | Admin main area shrinks to 49 px; Export, tabs and filters are off-screen |
| D4 | 305 px | 516 px | Admin main area shrinks to 49 px; Back, attachment and form controls are off-screen |

The screenshot API timed out repeatedly for D3/D4 at the overridden viewport.
Their checklist results therefore rely on the exact measurements above while
D-F11 retains the successful D2 screenshot as visual evidence of the shared
narrow-viewport failure.

## Alerts and authentication

- D1 empty submission creates a visible `role="alert"` message. It remained
  visible after 5.2 seconds, did not overlap the Submit button, and focus remained
  on Submit.
- D4 empty official response creates a visible `role="alert"` message. It remained
  visible after 5.2 seconds and focus remained on Send response.
- Signed-out D2 redirected to
  `/login?callbackUrl=%2Fcomplaints%2F33`.
- Signed-out D4 redirected to
  `/login?callbackUrl=%2Fdashboard%2Fadmin%2Fcomplaints%2F33`.

## Localization

- D3 Vietnamese UI retained the English document title
  `Support Request Management | HCMUS EMS`.
- D4 Vietnamese UI retained the English document title
  `Complaint Detail | HCMUS EMS` and the English label `Internal note`.

## Inconclusive automated checks

- Export Excel: the browser runtime can only capture download/file-chooser events;
  repeated download waits did not return an artifact, and request interception is
  unavailable. No Pass or Fail is inferred.
- Keyboard-only order: synthesized Tab traversal was not reliable enough to
  represent a physical keyboard session. No Pass or Fail is inferred.
- Network failure: the browser runtime exposes no supported request interception
  API. No artificial network result is recorded.
