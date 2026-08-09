# HW04 - Automation Test Report

**Student ID:** 23127209  
**System:** EShop SUT  
**Features:** FR-02, FR-08, FR-14  
**Execution date:** 2026-08-09  
**Tool:** Playwright Test + TypeScript

## 1. Phạm vi và chiến lược

Bộ test chuyển các test case đã thiết kế bằng Equivalence Partitioning và Boundary Value Analysis thành automation data-driven. Mỗi test đọc input, expected result và traceability từ JSON riêng. Browser projects được tạo từ `execution-matrix.json`; ba feature chạy độc lập trên Chromium, Firefox và WebKit để tạo chín HTML report. `maxFailures=0`, `retries=0` và một worker bảo đảm mọi case chạy đúng một lần. Custom evidence, screenshot, trace và video bị tắt vì sinh viên quản lý bug evidence riêng.

Các assertion luôn dựa trên `e-shop.md`. Kết quả runtime khác đặc tả được ghi là defect; test không được sửa expected result chỉ để pass.

## 2. Thiết kế và mức bao phủ

| Feature | Test case | Kỹ thuật chính | Assertion patterns |
|---|---:|---|---|
| FR-02 Login/Lockout | 15 | EP, BVA 29/30/31 giây | HTTP/status/body, DOM attributes/validity, URL/token/database state |
| FR-08 Checkout | 12 | EP, BVA total 1/0/-1 | UI visibility/value, intercepted payload, order/cart hậu điều kiện |
| FR-14 Category | 12 | EP, lower-bound length, access control | Table/UI, HTTP status, database list/create/delete state |

Tổng cộng có 39 test case và 117 lượt thực thi trên ba browser.

## 3. Kết quả

| Feature | Browser | Executed | Passed | Failed |
|---|---|---:|---:|---:|
| FR-02 | Chromium | 15 | 5 | 10 |
| FR-02 | Firefox | 15 | 5 | 10 |
| FR-02 | WebKit | 15 | 5 | 10 |
| FR-08 | Chromium | 12 | 5 | 7 |
| FR-08 | Firefox | 12 | 5 | 7 |
| FR-08 | WebKit | 12 | 5 | 7 |
| FR-14 | Chromium | 12 | 6 | 6 |
| FR-14 | Firefox | 12 | 6 | 6 |
| FR-14 | WebKit | 12 | 6 | 6 |
| **Tổng** | **3 browsers** | **117** | **48** | **69** |

Kết quả giống nhau trên ba browser. Điều này hỗ trợ kết luận rằng failure tập trung ở business logic, validation và access control, không phải khác biệt browser engine.

## 4. Human review và các sửa đổi đối với output AI

Trong lần đầu, AI giả định thao tác “Thêm vào giỏ” gửi `POST /api/cart` và chờ network response. Thực tế frontend giữ cart trong React state, nên test timeout. Sau khi đọc DOM/error context, test được sửa để giữ navigation trong SPA và không reload giữa lúc thêm sản phẩm với checkout.

AI cũng đề xuất dùng locator theo label cho login. UI thực tế không liên kết label với input, nên Page Object chuyển sang locator hai input theo thứ tự, đồng thời giữ assertion riêng để báo lỗi accessibility/form semantics. Với admin, AI ban đầu kỳ vọng login đổi URL; thực tế đây là SPA giữ nguyên `/`, vì vậy test chờ sidebar “Danh mục” thay vì chờ navigation.

Các selector text được gom vào Page Object; dữ liệu unique và cleanup trong `finally` được bổ sung để giảm flaky state. Case lockout dùng user tạm riêng vì SUT khóa sai 180 giây có thể làm hỏng các test tiếp theo nếu dùng tài khoản mặc định.

Lần chạy WebKit đầu tiên của FR-14 còn timeout ngẫu nhiên tại form đăng nhập admin. Đây là lỗi fixture, không phải defect category. Human review đổi precondition sang tạo token admin bằng API và nạp `adminToken` trước khi mở UI. Lần chạy lại WebKit hoàn tất 12/12 case và cho kết quả 6 pass/6 fail, đồng nhất với Chromium và Firefox.

## 5. Gap analysis

AI ban đầu chờ `POST /api/cart` dù frontend giữ giỏ trong React state, dùng `page.goto('/cart')` làm mất state SPA, giả định admin login đổi URL và đề xuất locator theo label dù form không có accessible label đúng. Cleanup category invalid cũng chưa thu lại ID mà SUT tạo trái đặc tả. Các vấn đề này được sửa bằng quan sát DOM/error context, SPA navigation, API fixture, dữ liệu tạm và cleanup trong `finally`.

Hai điểm đặc tả vẫn cần người chấm xác nhận: FR-14 không nói rõ duplicate category có bị cấm hay không; FR-02 không mô tả counter sau khi lock hết hạn rồi đăng nhập sai. Suite dùng oracle “duplicate bị từ chối” và “chuỗi mới bắt đầu từ 1”, đồng thời giữ failure nếu SUT hành xử khác.

## 6. Defect summary

| ID | Mức độ | Mô tả | Feature |
|---|---|---|---|
| BUG-01 | Critical | Counter tăng 2 và lock 180 giây thay vì +1/30 giây | FR-02 |
| BUG-02 | High | Email/password đều type=text; error UI không đúng yêu cầu | FR-02/FR-22 |
| BUG-03 | High | Tổng checkout có thể sửa trực tiếp | FR-08 |
| BUG-04 | Critical | Backend lưu nguyên `total_amount` giả mạo | FR-08 |
| BUG-05 | High | Route checkout cho guest và giỏ rỗng vẫn có nút thanh toán | FR-08 |
| BUG-06 | Medium | Category chấp nhận rỗng, whitespace và duplicate | FR-14 |
| BUG-07 | Critical | User thường có thể thêm/xóa category | FR-12/FR-14 |
| BUG-08 | Medium | Xóa category không tồn tại trả 200 | FR-14 |

Chi tiết và đường dẫn evidence nằm trong `Bug-Report.md`.

## 7. HTML reports và metadata

Mỗi feature/browser có `index.html` riêng. Config ghi `Run by: 23127209`, ISO timestamp, feature và browser vào report metadata; mỗi test có annotation StudentID, feature, browser và traceability. Tổng cộng có đúng chín report.

## 8. Giới hạn và công việc thủ công bắt buộc

Không có test case nào bị skip. Tám nhóm bug được tổng hợp trong `Bug-Report.md`; sinh viên tự thêm Issue URL và screenshot GitHub. Hai video không được AI tạo: sinh viên phải tự quay, thuyết minh tiếng Việt, chạy `whoami` và `hostname`, rồi điền URL vào README.
