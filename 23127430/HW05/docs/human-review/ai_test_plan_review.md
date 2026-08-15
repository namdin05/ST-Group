# AI-generated Test Plan Review

| No. | AI Proposal | Problem / Missing Point | Human Correction | Why AI Missed It |
|---|---|---|---|---|
| 1 | Conservative Option A proposed for the initial Load run | Local capacity and baseline were unknown at proposal time | ACCEPTED - Option A selected; keep tool-selection and dry-run gates | Hardware identity is now supplied, but measured baseline and tool choice remain unavailable |

Possible categories to use only after reviewing a real proposal:

- insufficient prompt context;
- model limitation;
- missing hardware context;
- SUT-specific behavior;
- unrealistic workload assumption;
- missing correlation;
- weak assertion;
- authentication/account-lockout behavior.

The Load design decisions below were reviewed and finalized on 2026-08-14. Tool selection and execution readiness are separate unresolved gates.

## WF01 Load Test — AI Proposal Review

**Status: HUMAN REVIEW COMPLETED - 2026-08-14**

| No. | AI Proposal | Potential Concern | Human Decision | Reason |
|---:|---|---|---|---|
| 1 | Option A: 1→5 VUs | Conservative initial concurrency on a local, unprofiled environment | ACCEPTED - SELECTED AS FINAL INITIAL LOAD CONFIGURATION | Limits first-run side effects while exercising concurrent WF01 traffic |
| 2 | Option B: 2→10 VUs | Higher cart/order growth and no Option A baseline yet | NOT SELECTED FOR INITIAL RUN | Retained as a future candidate; this is not a finding that Option B is wrong |
| 3 | Option A ramp/hold/down: `2m/5m/1m` | Duration and side-effect budget required human confirmation | ACCEPTED | Provides gradual arrival, sustained observation, and orderly completion |
| 4 | Random think-time `1–2s`, `2–4s`, `2–5s`, `1–3s`; inter-iteration `3–6s` | User behavior distribution is designed rather than measured | ACCEPTED | Suitable conservative pacing for the initial baseline; ranges must be encoded exactly |
| 5 | Seven requests/iteration with Cart and Order read-backs | Extra validation reads alter request mix but prevent false business success | ACCEPTED | State read-backs provide functional evidence for Cart and Checkout |
| 6 | One fixed unique account per VU; 50-VU ceiling; deterministic keyword rotation | Tool-specific CSV mechanics still depend on JMeter/k6 | ACCEPTED | Isolates concurrent state and avoids account sharing; tool implementation remains gated |
| 7 | Correlate JWT, product fields, shipping address, and order ID; no cart ID | Checkout does not consume cart; frontend/backend behavior differs | ACCEPTED | Matches source behavior without inventing unsupported correlation |
| 8 | AI recommends Option A first | May be too low/high without a measured baseline | ACCEPTED - FINAL INITIAL CHOICE | Human explicitly selected the conservative initial profile; no automatic switch to B |
| 9 | Select a tool and retain raw/summary/HTML evidence | k6 was selected instead of the conditional JMeter reservation | ACCEPTED - k6 SELECTED | The Load run used k6 raw JSON, summary JSON, console summary, and HTML dashboard output |
| 10 | Use disposable DB; start backend then provision; recreate for rerun | Startup is destructive and no approved cleanup automation exists | ACCEPTED | Protects persistent data and makes order/cart side effects repeatable |
| 11 | Candidate `<1%` server/transport errors and `0%` functional failures; derive p95 after baseline | No SLO or baseline supports final latency/throughput thresholds | ACCEPTED AS INITIAL GUARDRAILS | They are observation/evaluation rules, not claims that the SUT already meets them |
| 12 | Capture Windows/MSI hardware and Task Manager evidence | Load generator may share resources with SUT, but tool/location is not yet known | ACCEPTED | Provided hardware is documented; exact execution topology must be confirmed before measurement |

Human Review is complete. k6 was explicitly selected in the next execution step. The script first passed a `1 VU / 1 iteration` technical dry run, after which the user explicitly requested and authorized the full accepted Option A Load test. Option B was not executed.
