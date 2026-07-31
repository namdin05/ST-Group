# Manual Test Guide for 20 Pending Cells

Run only on the real EMS environment. Record `Pass`, `Fail`, or `N/A`; use `N/A`
only with a reason. A failed check requires a screenshot with the student email
overlay. Do not replace a compatibility run with viewport emulation.

| Case | Checklist mapping | Preconditions | Short procedure | Expected result | Evidence filename |
| --- | --- | --- | --- | --- | --- |
| MAN-01 | IA01-02: D1, D2, D3, D4 | Desktop, tablet, and phone environments available; user/Admin sessions ready | Open each screen on all three device classes; inspect content, controls, navigation, scrolling, and touch targets. | Each screen remains usable without clipped essential actions or unintended two-dimensional scrolling. | `MAN-01-<D1-D4>-<device>-<result>.png` |
| MAN-02 | IA01-07: D1, D2, D3, D4 | Pointer and keyboard available | Exercise every applicable control in default, hover, focus, active, and disabled/loading states. | States are visible, consistent, and do not rely only on color; disabled controls cannot be activated. | `MAN-02-<D1-D4>-states-<result>.png` |
| MAN-03 | IA02-04: D1, D2, D3, D4 | Start at the browser address bar; no modal open | Press Tab through the complete screen, Shift+Tab back, and repeat after opening/closing the D4 lightbox. | Focus order follows reading/task order, remains visible, does not enter hidden controls, and returns logically after overlays close. | `MAN-03-<D1-D4>-focus-order-<result>.png` |
| MAN-04 | IA03-08: D1, D2, D3, D4 | Physical keyboard preferred | Complete the primary task using Tab, Shift+Tab, Enter, Space, arrow keys, and Escape without a pointer. | All actions and dismissals are keyboard operable with no keyboard trap. | `MAN-04-<D1-D4>-keyboard-<result>.png` |
| MAN-05 | IA03-12: D2 | Enough user requests to show more than one page | Apply search/status filter, move to page 2, open a request, then return to the list. | Page, query, filter, and scroll/context are preserved or restored predictably. | `MAN-05-D2-pagination-<result>.png` |
| MAN-06 | IA03-13: D3 | Admin session; browser download permission enabled | Apply a known filter, select Export Excel once, wait for completion, and open the downloaded workbook. | One valid spreadsheet downloads and its rows/columns match the visible filter and request data. | `MAN-06-D3-export-<result>.png` |
| MAN-07 | IA04-05: D3 | Admin session; screen reader or live-region inspector available | Trigger Export on normal and slow connectivity; observe immediate, progress, success, and error feedback. | Status is timely, non-obscuring, programmatically announced, and explains recovery after failure. | `MAN-07-D3-export-feedback-<result>.png` |
| MAN-08 | IA04-09: D1 | Valid near-limit image; network throttling available | Throttle upload, attach the image, observe transfer, then interrupt connectivity and retry. | Progress is visible; failure preserves form data and provides a clear retry/recovery action. | `MAN-08-D1-upload-progress-<result>.png` |

## Recording rule

1. Update only the mapped cell after completing the full procedure.
2. For `Fail`, add or update a finding and link its screenshot.
3. For `Pass`, record the environment and observation; no failure screenshot is required.
4. Keep `Pending` when the environment or evidence is insufficient.
