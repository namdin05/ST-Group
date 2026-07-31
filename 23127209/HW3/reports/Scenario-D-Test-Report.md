# Scenario D — GUI and Usability Test Report

Status: **Windows execution expanded; compatibility expansion pending**

Test dates: 2026-07-30 to 2026-07-31

Environment: Windows, in-app Chromium browser, 1280 × 720  
SUT: `https://prod-dev.ems-fitus.cloud`

## Scope

| ID | Screen | Route | State inspected |
| --- | --- | --- | --- |
| D1 | Create support request | `/complaints/new` | Validation, attachment boundaries, Cancel, valid submit |
| D2 | My support requests | `/complaints`, `/complaints/33` | Pending→Resolved, attachment, official response |
| D3 | Admin request list | `/dashboard/admin/complaints` | Pending/Resolved, count change, filters, wrong-role access |
| D4 | Admin request detail | `/dashboard/admin/complaints/33` | Lightbox, internal note, validation, response, Resolved |

Task 2 with real participants is intentionally excluded. No participant identity,
session, SUS, or UEQ-S data is included.

## End-to-end result

The linked user→Admin→user workflow passed. User **Test User** created request
`#33`, Admin located it while Pending, added the internal note
`HW03-INTERNAL-NOTE-23127209`, sent an official response, and changed it to
Resolved. The user then saw the official response and notification, while the
internal note remained hidden.

| Property | Verified value |
| --- | --- |
| Request | `#33` — `HW03 Scenario D end-to-end test 23127209` |
| User | `nakhoa232@clc.fitus.edu.vn` |
| Type | Support |
| State transition | Pending → Resolved |
| Pending count | 11 → 12 → 11 |
| Attachment | Valid PNG accepted; detail displays `attachment_1` |
| Official response | Visible to user |
| Internal note | Visible to Admin only |
| Notification | User count increased to 1 |

## D1 observations

- Valid PNG preview, removal, submission, and disabled Loading state passed.
- A `.txt` file was rejected with “Only JPG, PNG, GIF and WEBP images are
  accepted.”
- A 5,243,904-byte PNG was rejected with “Each image must be 5 MB or smaller.”
- Six images were rejected with “You can upload up to 5 images.”
- Cancel returned to My Requests and discarded the unsaved title/description.
- Signed-out deep linking redirected to
  `/login?callbackUrl=%2Fcomplaints%2Fnew`, and login returned to D1.
- Empty submission exposes one aggregate alert; focus remains on Submit instead
  of moving to an invalid field.
- The request-type select has no programmatic name.
- Successful creation redirects to the record list without explicit confirmation.
- White text on the cyan primary control measured 2.08:1; gray helper text
  measured 2.56:1 and pink error text measured 3.53:1.
- At 320 CSS px, the user header exceeds the content viewport and causes horizontal
  scrolling.

## D2 observations

- Empty state provides a Create request action.
- Request `#33` appeared Pending immediately, then Resolved after Admin action.
- Detail shows the official response and hides the internal note.
- Status filter exposes only its current value, not a persistent Status label.
- English UI is paired with a Vietnamese document title.
- Search and status filter state persisted after opening request `#33` and returning.
- At 320 CSS px, the document measured 342 px against a 305 px content viewport;
  the menu control extended off-screen.

## D3 observations

- Pending/Resolved tabs and counts tracked request `#33` correctly.
- Search, member code, category, date range, Reset, pagination, and Export controls
  are present.
- Category’s native select is unnamed; the custom trigger exposes the unnatural
  accessible name “All categories Category”.
- A normal user opening the Admin-list deep link received a 404 page and no Admin
  data.
- Search, Pending/Resolved tab, and page-2 pagination state persisted after opening
  a request and returning; a no-match search displayed a dedicated result message
  and Reset action.
- Two automated Export Excel attempts produced no captured download. This remains
  Pending for manual verification rather than being classified as a failure.

## D4 observations

- Status, type, ID, requester, time, content, attachment, note, and response are
  visible to Admin.
- Attachment lightbox opens, closes with Escape, and restores focus.
- Empty Send produces a page-level alert; focus remains on Send response.
- Response content is required by validation but is not marked required in advance.
- Successful Send changes the request to Resolved and shows explicit success
  feedback.

## Findings and heuristic score

Eleven findings are recorded: five severity-3, five severity-2, and one severity-1.
The provisional usability score is **6/10**. The highest-impact issues are form
labelling, validation recovery, insufficient contrast, and narrow-viewport reflow.
The `ux-heuristics` framework drove checks for task clarity, navigation orientation,
feedback, error prevention/recovery, accessibility, and severity based on frequency,
impact, and persistence.

To reach 10/10, the product should first fix accessible labels and validation focus,
raise normal-text contrast to at least 4.5:1, and make the user header reflow at
320 CSS px. It should then add explicit creation feedback, preserve meaningful
attachment names, and complete verified keyboard-only and failure-recovery paths.

## Remaining limits

- Reliable keyboard-only traversal, complete all-state contrast coverage, 200% zoom
  with long translations, network-failure recovery, session expiry, D2 pagination,
  and D3 Export Excel remain Pending.
- The 320 CSS px check is a reflow test on Windows Chromium, not evidence of a real
  phone, mobile browser, or mobile operating system.
- macOS/Linux, additional browsers, tablet, and phone evidence require genuine
  environments and are not inferred from Windows Chromium.
- Google Form submission has not been performed.
