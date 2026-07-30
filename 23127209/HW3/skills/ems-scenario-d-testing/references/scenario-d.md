# Scenario D Reference

## Screens

| ID | Screen | Required behavior |
| --- | --- | --- |
| D1 | User creates support request | Category, title/content, image upload, validation, submit feedback |
| D2 | My Requests list/detail | Search/status, Pending/Resolved, attachment, official response |
| D3 | Admin Support Requests | Pending/Resolved tabs, title/member/category/date search and filters |
| D4 | Admin request detail | Image lightbox, internal note, official response, resolved state |

## Required lifecycle assertions

1. The same unique record appears in D2 and D3 after creation.
2. Attachment content survives D1 to D2/D4.
3. Pending changes to Resolved after the official response.
4. Official response is visible to the requester.
5. Internal note remains Admin-only.
6. Status names are consistent across list and detail.
7. Duplicate submission does not create duplicate records.

## Finding schema

`ID · Scenario/Screen · Type · Description · Steps/Heuristic · Expected · Actual ·
Severity · Suggested fix · Screenshot ref · Form-submission timestamp`

Severity:

- 0: not a problem.
- 1: cosmetic.
- 2: minor delay or frustration.
- 3: major task failure or accessibility barrier.
- 4: task cannot be completed.

## Compatibility rule

For every selected screen, the combined cells must cover at least three operating
systems, five browsers, and desktop/tablet/phone. This is coverage, not necessarily
all 45 combinations. Every tested cell requires a real screenshot.

