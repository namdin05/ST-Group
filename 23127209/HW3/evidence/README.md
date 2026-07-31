# Evidence Index

## Controlled test inputs

- [`test-assets/scenario-d-upload-test.png`](test-assets/scenario-d-upload-test.png):
  neutral PNG used by request `#33`.
- `scenario-d-invalid-upload.txt`: harmless invalid-type input.
- `scenario-d-oversize.png`: controlled image above 5 MB, generated on demand.
- `scenario-d-multi-1.png` … `scenario-d-multi-6.png`: controlled count-boundary
  inputs, generated on demand.

These are test inputs, not EMS screenshots.
The large/count-boundary files are reproducible with
[`../scripts/generate_upload_boundaries.py`](../scripts/generate_upload_boundaries.py)
and are intentionally omitted from the final repository after execution.

## Live EMS screenshots

| File | Screen | Verified state |
| --- | --- | --- |
| [`screenshots/D1-empty-form-validation.png`](screenshots/D1-empty-form-validation.png) | D1 | Aggregate required-field alert and focus on Submit |
| [`screenshots/D2-status-filter-unlabeled.png`](screenshots/D2-status-filter-unlabeled.png) | D2 | Status-filter context |
| [`screenshots/D2-reflow-320-overflow.png`](screenshots/D2-reflow-320-overflow.png) | D2 | 320 CSS px reflow failure and horizontal scrollbar |
| [`screenshots/D2-request-33-list-resolved.png`](screenshots/D2-request-33-list-resolved.png) | D2 | Request #33 is Resolved |
| [`screenshots/D2-request-33-resolved.png`](screenshots/D2-request-33-resolved.png) | D2 | Official response and generic attachment label |
| [`screenshots/D3-category-filter-unlabeled.png`](screenshots/D3-category-filter-unlabeled.png) | D3 | Category-filter context |
| [`screenshots/D4-empty-response-validation.png`](screenshots/D4-empty-response-validation.png) | D4 | Empty-response alert |
| [`screenshots/D4-request-33-resolved.png`](screenshots/D4-request-33-resolved.png) | D4 | Resolved state |
| [`screenshots/D4-request-33-response-note.png`](screenshots/D4-request-33-response-note.png) | D4 | Official response and Admin-only note |

## Compatibility overlays

Files under `compatibility/` are derived only by adding a transparent evidence
overlay to the corresponding live screenshot. UI content is otherwise unchanged.
