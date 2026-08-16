# HW05 — Performance Testing

**Sinh viên:** Nguyễn Anh Khoa  
**MSSV:** 23127209  
**Ngày thực thi:** 16/08/2026  
**Repository:** https://github.com/namdin05/ST-Group

## Test summary

Ba test plan JMeter dùng chung hành trình dữ liệu hóa: **FR-02 đăng nhập → FR-14 lấy danh mục → tìm sản phẩm → xem chi tiết → thêm giỏ → FR-08 checkout**. JWT, product ID, product name, price và order ID được correlation; mỗi virtual user dùng tài khoản riêng để không tạo lockout chéo. Các listener là Summary Report, Aggregate Report và View Results Tree; official run chạy non-GUI và có HTML dashboard tương ứng.

| Scenario | Workload | HTTP RPS | Journey RPS | Overall p95 | Checkout p95 | HTTP / assertion failures |
|---|---|---:|---:|---:|---:|---:|
| Load | 20 VU; ramp 60 s; tổng 240 s | 8.70 | 1.42 | 19 ms | 12 ms | 0 / 0 |
| Stress | 0→100 VU trong 360 s; giữ 120 s | 31.10 | 5.14 | 17 ms | 11 ms | 0 / 0 |
| Spike | 10 VU; +90 VU trong 10 s; giữ 60 s; recovery | 16.36 | 2.64 | 18 ms | 11 ms | 0 / 0 |
| Endurance | 80 VU; 720 s | 38.22 | 6.35 | 15 ms | 11 ms | 0 / 0 |

Ngưỡng ổn định thực nghiệm là **ít nhất 100 VU và 49.40 HTTP requests/s** trong cửa sổ Stress cao nhất; breakpoint chưa xuất hiện trong phạm vi đã chạy. Mức soak được chọn là 80 VU trong 12 phút, đạt 38.22 HTTP requests/s, p95 15 ms, backend memory 64.97→75.76 MB với đỉnh thoáng qua 181.12 MB. Dữ liệu không chứng minh memory leak vì memory đã phục hồi sau đỉnh. Không có performance issue đủ bằng chứng để mở GitHub Issue mới; số performance issue là **0**. Các bug chức năng FR-02, FR-08 và FR-14 đã tồn tại trên GitHub Issues nên không được báo trùng.

## Deliverables

- `Main-Report.md` và `Main-Report.pdf`: thiết kế, thực thi, phân tích và continuous performance proposal.
- `AI-Audit-Report.md/.pdf` và `AI-Critique.md/.pdf`: khai báo AI, ground truth, misinterpretation hunt và đánh giá optimization.
- Ba JMX, ba raw JTL, một endurance JTL, `test-data.csv`, `Resource-Monitoring.csv`.
- Ba thư mục HTML dashboard, ba ảnh dashboard và ba ảnh complete rerun với JMeter/backend/Task Manager cùng khung.
- `Hardware-Spec.txt`, `Hardware-DxDiag.png`, `Git-Commit-Log.txt`.
- `jmeter-performance-analyzer/`: Agent Skill hợp lệ và script phân tích độc lập.

## Self-assessment

| No. | Criteria | Grade | Self-assessed | Evidence |
|---:|---|---:|---:|---|
| 1 | Task 1 — Load testing | 20 | 20 | Load JMX/JTL/HTML, dashboard view, resource CSV, phân tích |
| 2 | Task 1 — Stress testing | 20 | 20 | Stress JMX/JTL/HTML, dashboard view, breakpoint/recovery analysis |
| 3 | Task 1 — Spike testing | 20 | 20 | Spike JMX/JTL/HTML, dashboard view, phase analysis |
| 4 | Task 2 — AI analysis + misinterpretation hunt | 10 | 10 | AI Audit, raw-log ground truth, correction table, optimization verdict |
| 5 | Task 3 — Continuous Performance Testing proposal | 10 | 10 | Trigger model, p95 gates, flow chart, trade-off analysis |
| 6 | Agent Skills | 10 | 10 | Validated skill, analyzer script, FR-08 end-to-end output documented |
|  | **Published-row subtotal** | **90** | **90** |  |
|  | **Normalized total stated by template** | **100** | **100** | `90 / 90 × 100` |

Assessment Template công bố sáu dòng chi tiết có tổng số học 90 nhưng in Total 100. Bài làm giữ nguyên sáu tiêu chí, không tự tạo tiêu chí thứ bảy, và chuẩn hóa self-assessed grade thành **100/100**.
