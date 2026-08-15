# Bug and Performance-Issue Reports

The completed k6 runs found no reproducible performance failure or breached stakeholder SLO. A subsequent traceability review of limitations recorded during those runs confirmed three functional cart/checkout defects:

- duplicate cart rows instead of quantity merging;
- acceptance of a client-controlled checkout total; and
- failure to clear the cart after successful checkout.

See [`bug_report.md`](bug_report.md) for requirements, source evidence, reproduction steps, impact, and recommended regression checks.

Future performance-defect reports should link the relevant raw log, HTML report, scenario evidence, environment details, and reproduction steps. Functional defects must remain clearly distinguished from measured performance failures.
