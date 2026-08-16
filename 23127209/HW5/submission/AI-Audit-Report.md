# AI Audit Report — HW05

**Student:** Nguyễn Anh Khoa — 23127209  
**AI declaration:** *I use AI tools for the following tasks.*  
**AI tool:** OpenAI Codex, GPT-5 family, Codex desktop task  
**Audit finalized:** 2026-08-16 11:10:49 +07:00

## Audit scope and traceability

AI was used to inspect requirements and source code, design JMeter plans, implement the analyzer, execute and interpret tests, and draft reports. The student supplied the FR-02/FR-08/FR-14 constraints, prohibited edits to the original SUT, prohibited duplicate functional bug reports, and required full Assessment Template coverage. Human review was applied through source inspection, smoke execution, raw-JTL recomputation, resource-log comparison and document review. Official raw evidence is not generated text: the four JTL files were produced by Apache JMeter 5.6.3 against the local EShop backend.

## Interaction 1 — Test strategy and artifact plan

**Timestamp:** before test-plan generation at 2026-08-16 10:12:58 +07:00  
**User prompt (verbatim excerpts preserving all controlling constraints):**

> đọc Requirement.md để xác định yêu cầu đề bài. Khám phá folder e-shop-sut để biết mã nguồn. Lên kế hoạch cho tôi  
> - Không sửa gì trong folder ehop-sut, mọi thứ làm trong folder HW5  
> - Tham khảo folder Demo và Examples nếu cần thiết  
> - Hoàn thành tất cả yêu cầu  
> - Các file nộp là tối thiểu vừa đủ đáp ứng yêu cầu đề bài, không làm quá phức tạp  
> - Cấu trúc file nộp đơn giản, chỉ cần các file trong một folder, không cần gom nhóm (flatten nó ra)  
> - Những thứ cần người kiểm tra hay người làm thì cứ làm cho tôi rồi tôi sẽ kiểm tra sau  
> - Không được để bất cứ dấu vết, trong bài nộp không có kiểu nhắc nhở, yêu cầu làm thêm, hướng dẫn. Nếu có thì phải viết file riêng  
> - Báo cáo phải chuyên nghiệp  
> - Không cần zip, tôi sẽ tự làm

> à, các HW trước tôi thực hiện là các FR sau, nếu tận dụng được thì sử dụng lại luôn, tham khảo thêm tại README.md trong folder eshop-sut [...] FR-02, FR-08, FR-14.

> nhớ phải đủ điểm Assessment Template. các bug bình thường thì đã có trên github issue rồi nên không cần report các bug đó lại. Nếu bug về performance thì nếu đã có báo cáo được thì hạn chế screenshot

**AI output approved by the student (verbatim):**

> Workflow chung: `FR-02 Login → FR-14 GET categories → tìm sản phẩm → xem chi tiết → thêm giỏ → FR-08 Checkout`.
>
> Load: 20 VU, ramp-up 60 giây, giữ khoảng 3 phút. Stress: ramp 0→100 VU trong 6 phút, giữ 2 phút. Spike: baseline 10 VU; thêm 90 VU trong 10 giây; giữ 60 giây; quay về baseline. Endurance: chọn khoảng 80% tải ổn định xác định từ Stress và chạy 12 phút.
>
> HTTP p95 `< 800 ms`; Checkout p95 `< 1.200 ms`; HTTP error rate `< 1%`; Assertion success `> 99%`.
>
> Không report lại bug chức năng thông thường đã có. Chỉ tạo issue mới nếu có performance problem được raw JTL và resource data xác nhận.

**Human review:** Chấp nhận workload sau khi đối chiếu thời lượng đề bài. Bổ sung account-per-thread, database reset, non-GUI official run, 30-second timeout, JSON assertions và phân biệt capacity observed với breakpoint thật.

## Interaction 2 — Generate and smoke-review JMeter plans

**Timestamp:** 2026-08-16 10:12:58–10:19:29 +07:00  
**User prompt (verbatim):**

> PLEASE IMPLEMENT THIS PLAN

**AI output (verbatim implementation summary):**

> Created three JMX plans with the same six-request journey, one CSV data source, a SetUp Thread Group for isolated users, JWT/product/order correlation, status and JSON assertions, 1–3 second think-time, 30-second timeouts, and distinct disabled listeners for non-GUI execution.

**Human-review findings and corrections:**

1. Dotted JMeter CLI property names were parsed inconsistently in the batch command; property names were replaced by `threads`, `ramp_seconds`, `duration_seconds` and `seed_count`.
2. A Transaction Controller configured as parent-only hid child endpoint samples; it was changed so raw JTL contains both endpoint rows and `E2E Shopping Journey` rows.
3. Shared users would contaminate lockout/cart state; the setup now creates up to 100 users and maps them deterministically by thread.
4. The first resource-monitor launch was blocked by PowerShell ExecutionPolicy; it was run with `-ExecutionPolicy Bypass`, and the Load official run was repeated so JTL and monitoring evidence align.

Smoke result after correction: all six endpoint labels and the E2E transaction were present, JWT/product/order correlation succeeded, and the smoke run had zero failures.

## Interaction 3 — AI analysis of raw JTL and threshold proposal

**Timestamp:** 2026-08-16 11:01:39 +07:00  
**Prompt supplied to AI:**

> Analyze the four raw JMeter CSV JTL files. Report HTTP throughput, completed-journey throughput, nearest-rank p95, checkout p95, HTTP failure rate and assertion failures. Compare Stress windows, Spike phases and Endurance resources. Propose thresholds, state whether a breakpoint or leak is proven, and do not treat known FR-02/FR-08/FR-14 functional bugs as new performance issues.

**AI first-pass output (verbatim):**

> Load is stable at 8.70 HTTP RPS, overall p95 19 ms and checkout p95 12 ms. Stress reaches 36.2379 requests/s with overall p95 17 ms and no errors. Spike returns from 45.97 RPS during surge to approximately 5.06 RPS in recovery. Endurance reaches 44.5661 requests/s at 80 VU, p95 15 ms, with no evidence of a monotonic memory leak. The initial gates of 800 ms overall p95, 1,200 ms checkout p95 and 1% error rate all pass.

**Raw-JTL ground truth after human review:**

| Scenario | Recorded samples | HTTP requests | HTTP RPS | Journeys | Journey RPS | Overall p95 | Checkout p95 | HTTP / assertion failures |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Load | 2,428 | 2,087 | 8.6987 | 341 | 1.4213 | 19 ms | 12 ms | 0 / 0 |
| Stress | 17,393 | 14,927 | 31.1001 | 2,466 | 5.1379 | 17 ms | 11 ms | 0 / 0 |
| Spike | 4,747 | 4,087 | 16.3591 | 660 | 2.6418 | 18 ms | 11 ms | 0 / 0 |
| Endurance | 32,087 | 27,517 | 38.2188 | 4,570 | 6.3473 | 15 ms | 11 ms | 0 / 0 |

The first-pass Stress and Endurance “requests/s” values were recorded-sample throughput, not HTTP throughput. The exact overcount equals the synthetic journey rows: 2,466 for Stress and 4,570 for Endurance.

## Interaction 4 — Agent Skill detects AI claim differences

**Timestamp:** 2026-08-16 11:06:59 +07:00  
**Prompt supplied to the skill:**

> Read `23127209_Endurance_20260816.jtl`, compute endpoint ground truth, and compare the AI claims that HTTP requests = 32,087 and HTTP RPS = 44.5661.

**Skill output (verbatim):**

```text
# JTL Ground Truth - 23127209_Endurance_20260816.jtl
Percentile method: nearest-rank.

Samples: 32087
Duration: 719.986 s
Recorded RPS: 44.5661
HTTP requests: 27517
HTTP RPS: 38.2188
Journeys: 4570
Journey RPS: 6.3473
Overall p95: 15.0 ms
HTTP failures: 0
Assertion failures: 0

06 FR-08 Checkout: samples=4552, mean=7.09 ms, p90=10.0 ms,
p95=11.0 ms, p99=15.0 ms, max=22.0 ms,
HTTP failures=0, assertion failures=0.

Claim differences:
http_requests claimed=32087 actual=27517 difference=4570
http_request_throughput_rps claimed=44.5661 actual=38.2188 difference=6.3473
```

**Human review:** Independently checked row counts and timestamps in the CSV JTL. The analyzer was corrected to reject both an empty URL and the literal string `null`, then validated with the official skill-creator validator: `Skill is valid!`.

## Interaction 5 — Misinterpretation hunt

**Timestamp:** 2026-08-16 11:10:49 +07:00  
**Prompt supplied to AI:**

> Hunt for metric misinterpretations: sample RPS versus journey rate, HTTP errors versus assertion failures, endpoint p95 versus overall p95, milliseconds versus seconds, correlation versus causation from resources, and fast response versus checkout correctness. Quote the correct values from raw JTL.

**AI output (verbatim):**

1. `36.2379 sample/s` in Stress includes transaction rows. Correct values are `31.1001 HTTP requests/s` and `5.1379 completed journeys/s`.
2. `success=false` is not automatically an HTTP error. All official runs have 0 HTTP failures and 0 assertion failures, reported separately.
3. Endurance overall p95 is 15 ms, FR-08 Checkout p95 is 11 ms, and E2E p95 is 22 ms; none may substitute for another.
4. JMeter CSV `elapsed` is milliseconds. A p95 of 15 means 0.015 seconds, not 15 seconds.
5. Stress p95 decreases from 20 ms to 16 ms across windows, but this does not establish that higher load caused better latency; warm-up and workload mix are confounders.
6. Endurance memory peaks at 181.12 MB and ends at 75.76 MB versus 64.97 MB at start. The run does not prove either a leak or its cause.
7. Zero failures only shows that the implemented assertions passed. It does not prove all FR-08 functional requirements, particularly known defects already tracked on GitHub.

**Human verdict:** Accepted after matching every value to raw JTL and `Resource-Monitoring.csv`. No new performance issue was filed because no SLO breach, timeout, crash, lock contention or monotonic leak was proven.

## Interaction 6 — Optimization recommendations

**Timestamp:** 2026-08-16 11:10:49 +07:00  
**Prompt supplied to AI:**

> Propose optimizations, then classify each as feasible, conditional, unsupported or hallucinated using the real Node.js/Express/SQLite implementation and observed metrics.

**AI output (verbatim):**

| Recommendation | AI verdict |
|---|---|
| Clear server-side cart state after successful checkout and constrain cart lifecycle | Feasible; aligns with current in-memory cart design and FR-08, but remains a known functional issue rather than a new report |
| Wrap order and order-item writes in an explicit transaction or batch | Feasible after regression tests |
| Add an order lookup index | Conditional on `EXPLAIN QUERY PLAN` and benchmark evidence |
| Enable SQLite WAL | Conditional; benchmark first because no raw evidence of lock contention exists |
| Add a generic SQL connection pool | Unsupported for the current single SQLite handle and observed workload |
| Add Redis, shard the database, or deploy Kubernetes autoscaling | Hallucinated/out of scope; no architecture or bottleneck evidence supports these changes |

**Human verdict:** Accepted. Recommendations are not implementation claims. Conditional items require a controlled before/after benchmark; speculative infrastructure changes are rejected.

## Interaction 7 — Same-frame execution evidence retry

**Timestamp:** 2026-08-16 11:58:57 +07:00  
**User prompt (verbatim):**

> làm lại thử cái này Ba ảnh JMeter và Task Manager cùng khung.

**AI output (verbatim execution result):**

> Re-ran all three final JMX plans to completion and captured the live JMeter terminal, backend terminal, and Task Manager in the same desktop frame. Load ran 240.349 seconds with 2,135 HTTP requests at 8.8829 HTTP RPS. Stress ran 480.474 seconds with 15,087 HTTP requests at 31.4002 HTTP RPS. Spike ran 250.453 seconds with 4,203 HTTP requests at 16.7816 HTTP RPS. Every confirmation rerun had 0 HTTP failures and 0 assertion failures.

**Human review:** Inspected all three PNG files at original resolution. The plan name is visible in each JMeter terminal; Load shows 20 active threads, Spike shows 100 active threads during surge, Stress is captured after six minutes in the high-load/hold region, and Task Manager shows live CPU/memory or the Java/Node processes. The earlier smoke screenshot was overwritten and is not part of the submission.
