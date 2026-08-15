# Demo Video

## Current Status

**Complete — link and metadata verified on 2026-08-15.** The submitted video is [Demo Performance Testing and Apply SKILL to HW-05](https://youtu.be/IkSJTWDu4_U).

| Verification | Result |
| --- | --- |
| Accessibility | Opened successfully without signing in |
| YouTube visibility label | `Unlisted` |
| Duration | `6:03`, meeting the minimum six-minute requirement |
| Demonstrated scope | HW05 performance testing and Agent Skill use on WF01 |
| Narration/content authenticity | Final Human Review remains the student's responsibility |

## Required Final Evidence

- [x] Unlisted YouTube link.
- [x] At least six minutes total (`6:03`).
- [x] Student's own Vietnamese narration — student-confirmed final artifact.
- [x] k6 and the backend resource monitor visible in the recording frame — student-confirmed final artifact.
- [x] End-to-end use of `$run-api-performance-tests` on the complete WF01 endpoint group.
- [x] Load, Stress, Spike, evidence paths, result analysis, and Human Review explained from genuine artifacts.

The link was checked without the uploader's signed-in session. Recheck it once more from the final Moodle submission device before uploading the archive.

## Agent Skill Demo Storyboard

Use the existing genuine WF01 artifacts in **Audit/Analyze mode**. Do not rerun the full Load, Stress, Spike, or Endurance profiles merely for the video.

### 0:00–0:40 — Introduction and Authorization

1. Start screen recording at 1080p or another readable resolution.
2. Show the repository root and state your student ID, selected tool (`k6 v2.0.0`), authorized local SUT, and workflow `WF01 — Search & Single-item Purchase`.
3. State that all measured runs used an isolated disposable SQLite runtime and that the video will analyze genuine saved artifacts.

Suggested narration:

> Em sử dụng Agent Skill `$run-api-performance-tests` để kiểm tra workflow WF01 trên môi trường local được phép. Skill yêu cầu Human Review, database tạm, raw evidence thật và không tự tạo kết quả còn thiếu.

### 0:40–1:30 — Show and Invoke the Skill

1. Open [`../agent-skill/run-api-performance-tests/SKILL.md`](../agent-skill/run-api-performance-tests/SKILL.md) and briefly show its operating modes and review gates.
2. In Codex, enter this prompt:

```text
$run-api-performance-tests

Mode: Audit/Analyze. Use the existing repository artifacts only; do not rerun the SUT and do not modify results.
Audit the complete WF01 Search & Single-item Purchase endpoint group.
Verify endpoint coverage, CSV data allocation, Load/Stress/Spike/Endurance plans, raw metrics, evidence paths, Human Review corrections, and remaining submission gaps.
For every conclusion, cite the repository artifact and distinguish measured facts from limitations.
```

3. Explain that choosing Audit/Analyze is intentional because genuine executions already exist and the skill prohibits recreating or overwriting them.

### 1:30–2:30 — Demonstrate the Complete Endpoint Group

Show the selected plan and explain one iteration:

```text
Login → Search → Product Detail → Add to Cart → Cart read-back → Checkout → Order read-back
```

Point out the three required groups:

- Auth-heavy: `POST /api/login`;
- Read-heavy: Search and Product Detail; and
- Transactional: Add to Cart, Checkout, and Order read-back.

Then show [`../test-data/users.csv`](../test-data/users.csv) and [`../test-data/products.csv`](../test-data/products.csv). Explain the 50 synthetic accounts, one unique account per concurrent VU, deterministic keyword rotation, and the 50-VU data ceiling.

### 2:30–3:30 — Show Safety and Human Review

1. Open [`../docs/human-review/ai_test_plan_review.md`](../docs/human-review/ai_test_plan_review.md).
2. Explain the disposable-database rule, dry-run gate, lockout handling, abort conditions, and cleanup verification.
3. Describe at least two AI corrections made by Human Review, such as not calling 50 VUs the SUT capacity and not treating Checkout's highest p95 as a proven bottleneck.

### 3:30–4:50 — Run the Skill's Result Extractor

From the repository root, run:

```powershell
python agent-skill/run-api-performance-tests/scripts/summarize_performance_results.py results/raw/23127430_Load_20260814_summary.json --output-format markdown
```

Show that the output is derived from the genuine k6 summary. Briefly compare it with the scenario table in [`../main_report.md`](../main_report.md), then show the Stress, Spike, and Endurance reports under [`../results/`](../results/).

Narrate the reviewed conclusion: all configured checks and thresholds passed, Stress reached the 50-account ceiling rather than a measured breaking point, and the 12-minute Endurance hold demonstrated 9.5931 requests/s with a 58.54 MB Node working-set ceiling for this local profile.

### 4:50–5:50 — Show Genuine Evidence

1. Open the scenario screenshot indexes under [`../evidence/screenshots/`](../evidence/screenshots/).
2. Show k6 progress/final summary and backend resource evidence for Load, Stress, and Spike.
3. Show the Endurance hold and final PASS evidence.
4. Keep k6 evidence and the corresponding resource evidence visible side by side in the recording frame while explaining the timestamp/phase relationship. Do not combine different moments into a new misleading image.

### 5:50–6:40 — Show AI Analysis and Defects

1. Open [`../docs/ai-analysis/result_analysis.md`](../docs/ai-analysis/result_analysis.md) and explain one corrected metric interpretation.
2. Open [`../docs/bug-reports/bug_report.md`](../docs/bug-reports/bug_report.md).
3. Show that functional defects are linked to GitHub Issues #50, #32, and #31, while no measured performance issue is claimed.

### 6:40–7:30 — Run Completeness Validation

Run:

```powershell
python agent-skill/run-api-performance-tests/scripts/validate_hw05_artifacts.py --root . --student-id 23127430
```

Explain that the validator checks presence and consistency but cannot prove narration, screenshot authenticity, Human Review authorship, or public-link accessibility. Show remaining failures honestly rather than hiding them.

### 7:30–8:00 — Conclusion

Summarize what the skill contributed: source-grounded workflow design, review gates, safe execution, raw-result analysis, evidence traceability, misinterpretation checks, and submission validation. End by showing the public repository and, after upload, add the real unlisted YouTube URL at the top of this file and in the root README.

## Final Recording Checklist

- [x] The student's Vietnamese voice is audible throughout — student-confirmed.
- [x] The recording is at least six minutes (`6:03`).
- [x] Codex visibly receives the `$run-api-performance-tests` prompt — student-confirmed.
- [x] The complete WF01 endpoint sequence is explained — student-confirmed.
- [x] Genuine k6 and backend resource evidence are shown together in the recording frame — student-confirmed.
- [x] At least one raw-result extraction command is run live — student-confirmed.
- [x] Human Review corrections and limitations are explained — student-confirmed.
- [x] The completeness validator is run and remaining gaps are stated honestly — student-confirmed.
- [x] The uploaded YouTube link works in a signed-out/private window — independently verified.
