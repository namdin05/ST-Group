# HW04 - AI Automation Testing - 23127209

Playwright TypeScript automation cho EShop SUT, bao phủ FR-02, FR-08 và FR-14 trên Chromium, Firefox và WebKit.

## Kết quả thực thi

| Chỉ số | Kết quả |
|---|---:|
| Features | 3 |
| Test cases | 39 |
| Browser runs | 9 |
| Lượt thực thi | 117 |
| Passed | 48 |
| Failed | 69 |
| Skipped | 0 |
| Defect groups | 8 |

Failure được giữ nguyên vì đây là bằng chứng SUT không tuân thủ đặc tả, không phải mục tiêu ép suite pass.

## Chạy test

```powershell
npm.cmd install
npx.cmd playwright install
$env:FEATURE='fr-02'
$env:BROWSER='chromium'
$env:RUN_TIMESTAMP=(Get-Date).ToUniversalTime().ToString('o')
$env:PLAYWRIGHT_HTML_OUTPUT_DIR='reports/fr-02/chromium'
npx.cmd playwright test tests/fr-02.spec.ts --project=chromium
```

Thay `fr-02` và `chromium` bằng từng giá trị trong `tests/data/execution-matrix.json` để chạy đủ chín tổ hợp. Không cần custom runner.

Có thể override `WEB_BASE_URL`, `ADMIN_BASE_URL`, `API_BASE_URL`, `STUDENT_ID` và tài khoản bằng biến môi trường; xem `.env.example`.

## Deliverables

- Test scripts: `tests/fr-02.spec.ts`, `tests/fr-08.spec.ts`, `tests/fr-14.spec.ts`
- Data-driven JSON: `tests/data/`
- 9 Playwright HTML reports: `reports/fr-02|fr-08|fr-14/<browser>/index.html`
- Báo cáo chính và AI documents: các file Markdown/PDF trong hồ sơ nộp
- Agent Skill: `skills/eshop-playwright-automation/`
- Bug report/issue descriptions: `Bug-Report.md`, `Issue.md`

## Liên kết cần sinh viên bổ sung

- Public GitHub repository: https://github.com/namdin05/ST-Group
- Bug report và screenshot GitHub: xem `Bug-Report.md`; sinh viên tự bổ sung URL/screenshot cuối cùng.
- Video HW04 >= 5 phút: **TODO - YouTube unlisted URL**
- Video Agent Skill: **TODO - YouTube unlisted URL**
- Git history: 9 commit hợp lệ thay đổi `.spec.ts`; xem `commits.txt`.

## Tự đánh giá

| Tiêu chí | Điểm tối đa | Tự đánh giá |
|---|---:|---:|
| Task 1 - FR-02 | 25 | 23 |
| Task 1 - FR-08 | 25 | 23 |
| Task 1 - FR-14 | 25 | 23 |
| Demo video | 15 | 0 |
| Agent Skill | 10 | 8 |
| **Tổng hiện tại** | **100** | **77** |

Điểm video đang để 0 cho tới khi sinh viên tự quay và điền URL; không có evidence giả.

Workspace không tạo sẵn ZIP. Các artifact đã được triển khai vào `submission/`; khi tự đóng gói, dùng tên điểm ba chữ số theo requirement: `23127209_HW04_AI_Automation_077.zip`.
