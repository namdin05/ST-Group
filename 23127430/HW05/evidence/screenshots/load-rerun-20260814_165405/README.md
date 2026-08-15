# K6 load-test screenshot evidence — 2026-08-14 16:54:05

Đây là bộ evidence được chụp từ một lần chạy lại độc lập của workflow `WF-01` bằng k6. Backend sử dụng bản sao mã nguồn và SQLite tạm trong thư mục `%TEMP%`; database gốc trong repository không được dùng để ghi.

## Kết quả

- Profile: Option A, ramp `1 → 5 VUs` trong 2 phút, giữ 5 VUs trong 5 phút, ramp-down 1 phút.
- Kết luận: **PASS**, k6 exit code `0`.
- Iterations: `139`; HTTP requests: `973`; checks: `3197 pass / 0 fail`.
- HTTP duration: average `6.99 ms`, p95 `18.68 ms`, max `34.92 ms`.
- Request rate: `1.9715 requests/second`; HTTP request failure rate: `0%`.
- Database gốc: SHA-256 trước/sau trùng khớp; `119` users vẫn còn nguyên.
- Database tạm: `139` orders, tương ứng với `139` workflow iterations hoàn tất.

## Danh mục ảnh

| File | Nội dung evidence |
| --- | --- |
| [01_windows_about.png](01_windows_about.png) | CPU, RAM, GPU và storage của máy chạy test; ảnh đã được crop để không chứa thông tin định danh. |
| [02_backend_startup.png](02_backend_startup.png) | Backend tạm khởi động trên bản sao mã nguồn và SQLite mới trong `%TEMP%`. |
| [03_test_data_provision.png](03_test_data_provision.png) | Kiểm tra CSV và provision `50` tài khoản test, data gate PASS. |
| [04_k6_dry_run_pass.png](04_k6_dry_run_pass.png) | Dry run 1 VU/1 iteration: 7 requests, 23 checks, không lỗi. |
| [05_full_run_reprovision.png](05_full_run_reprovision.png) | Provision lại data trước full load test để bảo đảm trạng thái sạch. |
| [06_task_manager_ramp_k6.png](06_task_manager_ramp_k6.png) | Task Manager tại T+137.8 giây, ngay đầu hold sau ramp-up: CPU 13%, memory 76%, disk 1%. |
| [07_task_manager_hold_cpu_sorted.png](07_task_manager_hold_cpu_sorted.png) | Task Manager tại T+275.1 giây, giữa hold: CPU 13%, memory 72%, disk 2%. |
| [07b_process_resource_hold.png](07b_process_resource_hold.png) | Đối chiếu PID thật của backend Node và k6 tại T+317.3 giây cùng CPU/working set. |
| [08_k6_full_load_pass.png](08_k6_full_load_pass.png) | Console summary và threshold verdict của full Option A: PASS. |
| [09_k6_html_report.png](09_k6_html_report.png) | Dashboard HTML được mở và chụp trong trình duyệt, hiển thị đồ thị toàn thời gian chạy. |
| [10_database_cleanup_pass.png](10_database_cleanup_pass.png) | Hash database gốc trước/sau, số user, số order tạm và trạng thái đóng port: PASS. |

## Kết quả máy đọc được

- [Full summary JSON](../../../results/evidence-rerun/20260814_165405/raw/23127430_Load_20260814_165405_summary.json)
- [Full console log](../../../results/evidence-rerun/20260814_165405/raw/23127430_Load_20260814_165405_console.log)
- [HTML report](../../../results/evidence-rerun/20260814_165405/html/23127430_Load_20260814_165405.html)
- [Dry-run summary JSON](../../../results/evidence-rerun/20260814_165405/raw/23127430_Load_20260814_165405_dry-run_summary.json)

