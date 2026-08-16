---
name: jmeter-performance-analyzer
description: Analyze Apache JMeter CSV JTL files, calculate reproducible latency percentiles and throughput, separate HTTP failures from assertion failures, summarize endpoint and journey metrics, and compare numeric AI claims with raw-log ground truth. Use for JMeter performance-result reviews, AI misinterpretation hunts, SLO checks, and evidence tables derived from .jtl files.
---

# JMeter Performance Analyzer

## Workflow

1. Preserve the input JTL unchanged and confirm it contains the JMeter CSV header.
2. Run `scripts/analyze_jtl.py` for every measured scenario.
3. Treat the generated table as ground truth only for fields present in the raw log.
4. Keep these measures distinct:
   - `recorded sample throughput`: HTTP samples plus synthetic transaction samples per second;
   - `HTTP request throughput`: only samples with a request URL per second;
   - `journey throughput`: only `E2E Shopping Journey` samples per second;
   - `HTTP failures`: numeric response codes greater than or equal to 400;
   - `assertion failures`: unsuccessful samples whose HTTP code is below 400.
5. Compare AI claims with the JSON ground truth. Flag values outside the stated tolerance and explanations unsupported by resource evidence.
6. Never infer CPU, memory, database locking, or production capacity from JTL timing alone.

## Commands

Generate Markdown and JSON summaries:

```powershell
python scripts/analyze_jtl.py result.jtl --markdown metrics.md --json metrics.json
```

Compare numeric claims saved as JSON:

```powershell
python scripts/analyze_jtl.py result.jtl --claims claims.json --tolerance 0.01
```

Use milliseconds for latency and samples/second for throughput. Cite the input filename, sample count, time range, percentile method, and exact label whenever reporting a value.

## Review Rules

- Do not call `success=false` an HTTP error without checking `responseCode` and `failureMessage`.
- Do not call overall p95 an endpoint p95.
- Do not equate checkout response time with complete shopping-journey time.
- Do not equate fast responses with correct FR-08 behavior.
- Do not claim a sustainable threshold without a sustained run and resource measurements.
