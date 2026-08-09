# AI Audit Report

## Declaration

I use AI tools for the following tasks: phân tích requirement, lập kế hoạch automation, tạo Playwright scaffolding/data/spec, chạy và sửa test, tổng hợp báo cáo, tạo Agent Skill và xây PDF. Tất cả kết quả đã được chạy/kiểm tra; failure không bị che giấu.

## Interaction 1

- **Tool:** OpenAI Codex
- **Date/time:** 2026-08-09, Asia/Saigon
- **Prompt:** “đọc requirement.md để xác định yêu cầu bài làm, ngoài ra tôi đã cung cấp các FR-02, FR-08, FR-14 theo yêu cầu, e-shop.md là các mô tả của hệ thống”
- **Output:** Phân tích yêu cầu cho thấy FR-02 có 15 case; FR-08 và FR-14 ban đầu chỉ có 8 case, chưa đạt tối thiểu 12. Đề xuất Playwright, JSON data, ba browser và chín report.
- **Human review:** Xác nhận đúng số lượng bằng test discovery; mở rộng FR-08/FR-14 lên 12.

## Interaction 2

- **Tool:** OpenAI Codex
- **Date/time:** 2026-08-09, Asia/Saigon
- **Prompt:** “rà soát lại cho tôi”
- **Output:** Kế hoạch được sửa để có 39 test case, 117 executions, 9 report; bổ sung Agent Skill, PDF, video, Git history và nguyên tắc giữ failure thật.
- **Human review:** Chốt URL localhost, StudentID 23127209 và tài khoản từ `e-shop.md`.

## Interaction 3

- **Tool:** OpenAI Codex
- **Date/time:** 2026-08-09, Asia/Saigon
- **Prompt:** “PLEASE IMPLEMENT THIS PLAN” cùng toàn bộ kế hoạch HW04 đã rà soát.
- **Output:** Các file chính xác được tạo trong `playwright.config.ts`, `tests/`, `scripts/`, `reports/` và `skills/eshop-playwright-automation/`. Playwright discovery xác nhận 117 executions. Chín browser run sinh 51 pass và 66 fail.
- **Human review:** Lần chạy đầu FR-08 timeout do AI chờ `/api/cart`; đã sửa bằng navigation SPA. Locator admin/login và cleanup invalid category cũng được sửa dựa trên DOM/error context.

<!-- pagebreak -->

## Interaction 4

- **Tool:** OpenAI Codex
- **Date/time:** 2026-08-09, Asia/Saigon
- **Prompt:** Yêu cầu thu gọn submission, không nộp runner scripts, giữ ba spec riêng, browser data-driven, giữ `Bug-Report.md` và chuẩn hóa `Issue.md` cho FR-02/08/14.
- **Output:** Kế hoạch chốt ba spec + bốn JSON, đúng chín HTML report và chỉ giữ artifact quy định trong submission.
- **Human review:** Xác nhận runner/PDF builder chỉ dùng nội bộ; Agent Skill vẫn được giữ.

## Interaction 5

- **Tool:** OpenAI Codex
- **Date/time:** 2026-08-09 21:10:18 +07:00, Asia/Saigon
- **Prompt:** “PLEASE IMPLEMENT THIS PLAN” cùng kế hoạch chỉ nộp Playwright specs, không nộp runner scripts.
- **Output:** Browser projects chuyển sang `execution-matrix.json`; custom evidence bị loại; chín process chạy 117 tests và sinh 48 pass/69 fail. Flakiness đăng nhập admin WebKit được sửa bằng token API và chạy lại thành công. Chín commit hợp lệ thay đổi `.spec.ts` được tạo.
- **Human review:** Phân biệt lượt sandbox `spawn EPERM` với defect SUT, loại kết quả môi trường, giữ assertion failure thật và xác nhận đúng chín report.


## Output manifest

Output nguyên văn là các source artifact và Git history trong repository. Console output nội bộ nằm trong `test-results/matrix-logs/` và JSON reporter nhưng không được đưa vào submission. Audit này không bịa prompt, video, issue hoặc evidence.
