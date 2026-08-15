# AI Performance Result Analysis & Misinterpretation Hunt

## 1. Input Results

- Load: `results/raw/23127430_Load_20260814.json` and summary/HTML artifacts - COMPLETED.
- Stress: `results/raw/23127430_Stress_20260815.json` and summary/HTML artifacts - COMPLETED.
- Spike: `results/raw/23127430_Spike_20260815.json` and summary/HTML artifacts - COMPLETED.
- Endurance: `results/raw/23127430_Endurance_20260815.json`, full/hold summaries, resource CSV, and HTML artifacts - COMPLETED.

## 2. AI Analysis

The accepted Option A Load run passed both initial guardrails. k6 completed 139 full WF01 iterations (973 requests) with 3,197/3,197 checks passing, 0% HTTP failures, and 0% functional failures. Overall HTTP response duration was 12.51 ms average, 24.34 ms p90, 33.01 ms p95, and 87.28 ms maximum. Throughput was 2.0254 requests/s and 0.2893 completed iterations/s.

Checkout had the highest endpoint latency (49.28 ms p95 and 87.28 ms maximum), consistent with its SQLite write. This is an observation, not a proven bottleneck or defect: the run did not saturate the machine, no SLO was supplied, and no comparative higher-load result exists.

Resource sampling recorded total machine CPU averaging 16.13% and peaking at 59.91%, at least 3,840 MB available memory, Node working set up to 55.99 MB, and k6 working set up to 34.70 MB. Because load generator and SUT shared the local Windows host, these are local combined observations rather than production-capacity evidence.

The bounded Spike run raised concurrency from 1 to 25 VUs in 5 seconds and passed all thresholds: 130 complete WF01 iterations, 910 requests, 2,990/2,990 checks, 0% HTTP failures, 0% functional failures, 30.22 ms p95, and 6.3095 requests/s. The HTML time series shows the expected request-rate burst and return toward the low-rate region. Compared with Load Option A, throughput was about 3.12 times higher while p95 was similar/slightly lower; this does not prove an optimization because the profiles and short local timing differ.

The Stress staircase reached 50 VUs and passed all thresholds: 613 completed iterations, 4,291 requests, 14,099/14,099 checks, 0% HTTP/functional failures, 25.10 ms p95, 140.49 ms maximum, and 12.4393 requests/s. Throughput scaled above Load and Spike, while the maximum latency increased. Because the test stopped at the 50-account dataset ceiling, it did not establish a breaking point or maximum capacity.

The Endurance profile held 20 VUs for 12 minutes between one-minute ramps and passed all thresholds: 1,081 completed and zero interrupted iterations, 7,567 requests, 24,863/24,863 checks, 0% HTTP/functional failures, 19.49 ms full-run p95, and 8.9541 requests/s. Exact timestamp filtering of the hold produced 6,907 requests, 9.5931 stable requests/s, 19.34 ms p95, and 22,687/22,687 checks. The backend working-set ceiling was 58.54 MB and the host available-memory floor was 5,354 MB. A weak backend trend fit (`0.177 MB/min`, `R² = 0.135`) does not show a strong monotonic leak pattern, but a 12-minute hold cannot rule out long-term degradation.

## 3. Human Verification Against Raw Logs

| Metric | AI Value | Correct Raw Value | Status | Explanation |
|---|---:|---:|---|---|
| HTTP p95 | 33.01 ms | 33.00548 ms | VERIFIED | k6 summary metric `http_req_duration.p(95)` |
| Throughput | 2.0254 requests/s | 2.0254036635 requests/s | VERIFIED | k6 summary `http_reqs.rate` |
| Iteration throughput | 0.2893 iterations/s | 0.2893433805 iterations/s | VERIFIED | k6 summary `iterations.rate` |
| HTTP error rate | 0% | 0 / 973 | VERIFIED | k6 `http_req_failed.value == 0` and console threshold pass |
| Functional error rate | 0% | 0 / 139 | VERIFIED | custom `functional_failures.value == 0` and 3,197 checks passed |
| Spike HTTP p95 | 30.22 ms | 30.216435 ms | VERIFIED | Spike summary `http_req_duration.p(95)` |
| Spike throughput | 6.3095 requests/s | 6.3095385084 requests/s | VERIFIED | Spike summary `http_reqs.rate` |
| Spike HTTP error rate | 0% | 0 / 910 | VERIFIED | Spike `http_req_failed.value == 0` |
| Spike functional error rate | 0% | 0 / 130 | VERIFIED | Spike custom metric and 2,990 passed checks |
| Stress HTTP p95 | 25.10 ms | 25.09635 ms | VERIFIED | Stress summary `http_req_duration.p(95)` |
| Stress throughput | 12.4393 requests/s | 12.4393143621 requests/s | VERIFIED | Stress summary `http_reqs.rate` |
| Stress HTTP error rate | 0% | 0 / 4,291 | VERIFIED | Stress `http_req_failed.value == 0` |
| Stress functional error rate | 0% | 0 / 613 | VERIFIED | Stress custom metric and 14,099 passed checks |
| Endurance HTTP p95 | 19.49 ms | 19.49256 ms | VERIFIED | Endurance full summary `http_req_duration.p(95)` |
| Endurance full throughput | 8.9541 requests/s | 8.9541085630 requests/s | VERIFIED | Endurance full summary `http_reqs.rate` |
| Endurance hold throughput | 9.5931 requests/s | 6,907 / 720 seconds | VERIFIED | Timestamp-filtered raw `http_reqs` points |
| Endurance hold p95 | 19.34 ms | 19.337 ms | VERIFIED | 6,907 hold-only duration points |
| Endurance checks/failures | 100% / 0% | 22,687 / 0 hold checks; 0 HTTP/functional failures | VERIFIED | Exact-hold summary |
| Endurance Node ceiling | 58.54 MB | 58.54 MB across 65 hold samples | VERIFIED | Resource CSV exact-hold filter |

## 4. Optimization Recommendations

| Recommendation | AI Proposal | Feasible / Hallucinated | Evidence / Reasoning |
|---|---|---|---|
| Preserve the current script as the local baseline | Feasible | Feasible | Genuine raw/summary/HTML artifacts exist and configuration is traceable |
| Optimize Checkout immediately | Do not implement yet | Unsupported at this stage | It is the slowest endpoint, but 49.28 ms p95 has no SLO violation and no saturation evidence |
| Add server-side transaction/validation review | Feasible functional improvement | Feasible, outside this run | Source trusts client total and does not consume cart; this is correctness scope, not proven by latency |
| Run Option B automatically | Rejected | Unsafe without review | Human selected Option A; database/cart side effects and higher-load thresholds require a new decision |
| Establish p95/throughput SLOs | Recommended | Feasible with stakeholder input | Current values are a baseline, not acceptance targets |

## 5. Misinterpretation Hunt and Corrections

The final AI arithmetic matched the raw k6 summaries, so Human Review found no numeric misread. The following interpretation risks were explicitly corrected before the final conclusion:

| Risky interpretation | Correct raw fact | Human correction | Why AI can miss it |
|---|---|---|---|
| 50 VUs is the SUT capacity | Stress completed 50 VUs, 12.4393143621 req/s, p95 25.09635 ms, 0 failures | The run ended at the 50-account data ceiling; no breaking point was found | Aggregate completion does not expose the external dataset cap |
| Stress improved latency over Load | Stress p95 25.09635 ms; Load p95 33.00548 ms | Different profiles, durations, concurrency, and local timing make this a non-causal comparison | AI can treat lower aggregate p95 as an optimization without a controlled A/B test |
| Checkout is a performance bug | Load Checkout p95 49.28 ms; overall checks and thresholds passed | It was the slowest observed endpoint, but there was no SLO violation or saturation evidence | Ranking endpoints is not the same as proving a bottleneck |
| Host CPU proves server utilization | Stress point samples were 19.61%, 12.26%, and 17.18% at selected phases | k6 and Node shared the host; samples include unrelated activity and are not a server-only curve | Resource context is outside the raw HTTP summary |
| Endurance threshold is maximum capacity | Twenty VUs sustained 9.5931 req/s for 12 minutes with no failures | This is the highest demonstrated stable point in the chosen soak, not the hardware or production maximum | A passing threshold can be mistaken for a breaking point without workload-boundary context |
| Endurance proves no memory leak | Node working set peaked at 58.54 MB; fitted trend had low `R² = 0.135` | No abnormal monotonic growth was observed in 12 minutes, but a longer soak is required for a leak conclusion | Short resource series cannot establish long-term heap behavior |

## 6. Final Human Review

On 2026-08-15, the student reviewed Load, Stress, and Spike and confirmed that those results met expectations and no abnormal behavior was observed. The later authorized Endurance run is `PASS` against its machine-evaluated local guardrails and likewise shows no evidenced anomaly; its new evidence remains ready for the student's post-run acceptance. None of the scenario results establishes maximum production capacity or a stakeholder SLO.
