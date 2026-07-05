# AI GAP

## FR-01:

## FR-07

 Lỗi 1: Sai logic nghiệp vụ tại TC-FR07-UI-05 (Giảm số lượng về 0)AI viết: Ở case này, AI kỳ vọng khi số lượng đang là 1, nếu bấm nút trừ - thì "Quantity does not go below 1" (Số lượng không giảm xuống dưới 1).  Thực tế E-commerce Việt Nam: Trên các hệ thống e-commerce thực tế, khi số lượng đang là 1 mà người dùng bấm tiếp nút -, hệ thống thường sẽ hiển thị popup hỏi người dùng có muốn xóa sản phẩm này khỏi giỏ hàng không, hoặc tự động xóa luôn sản phẩm đó ra khỏi giỏ, chứ không bị "khóa cứng" ở số 1.Cách sửa: Bạn cần sửa lại Expected Result của TC-FR07-UI-05: "Nếu số lượng là 1 và bấm nút -, hệ thống hiển thị thông báo xác nhận xóa sản phẩm hoặc tự động xóa sản phẩm khỏi giỏ hàng và cập nhật lại tổng tiền."
 
 Lỗi 2: Tính toán giá trị biên hời hợt ở Stage CTại hàng Line-item quantity, AI xác định biên là: 0 | 1 | 2. Đây là biên của UI (nút bấm).  Đối với API Testing, biên của quantity (kiểu dữ liệu số nguyên trong Postgres/Supabase của EShop) phải kiểm tra các giá trị âm (ví dụ: -1), giá trị trống, hoặc các giá trị không phải số nguyên (float số thập phân 1.5). AI đã bỏ qua biên dữ liệu lỗi này ở Stage C.
 
 Lỗi 3: Lỗi logic "Trùng tên nhưng khác ID" (Product Identity)
 - Trong phần cross-variable constraint, AI chỉ nghĩ đến trường hợp "Thêm cùng một sản phẩm nhiều lần".
 - Rủi ro thực tế: Chuyện gì xảy ra nếu 2 sản phẩm khác nhau (ID khác nhau) nhưng lập trình viên lười biếng đặt trùng thuộc tính name (Ví dụ: Cả 2 đều tên là "Áo thun" nhưng một cái ID=10, một cái ID=11)? Nếu hệ thống merge nhầm 2 sản phẩm này thành 1 hàng dựa vào name thay vì id thì sẽ là bug cực nặng.
 - Cách sửa: Thêm một case domain hoặc API kiểm tra việc thêm 2 sản phẩm trùng tên nhưng khác ID.

## FR-13

### Gaps in Domain Testing & Business Logic
- **Omission of Temporal Dimensions (Date Filtering):** The AI assumed a static, cumulative database where revenue equals all-time sales. It completely missed input variables and partitions for date-range filters (e.g., Today, This Month, Custom Range), which are mandatory for e-commerce financial auditing.
- **Accounting & Refund Logic Defects:** The domain variables only account for a one-way path to `status = delivered`. It ignored subsequent state mutations such as chargebacks, returns, or `refunded` statuses that must mathematically deduct from the aggregate revenue.
- **Real-Time Data Sync Neglect:** Given that the system utilizes Supabase real-time triggers, the AI failed to design scenarios verifying automatic, non-refresh UI updates on the revenue cards when order statuses change concurrently in the database.

### Gaps in Boundary Value Analysis
- **Negative and Currency Zero Bounds:** The BVA included purely theoretical negative values (`-1 ₫`) via manual payload injection but omitted logical boundaries around multi-currency handling or floating-point precision errors during heavy SQL `SUM()` aggregations in PostgreSQL.
- **Pagination and Data Volume Boundaries:** The total orders card count boundary was checked at `0` and `1`, but missed upper-bound UI layout testing (e.g., how the dashboard handles abbreviation formatting like displaying `1.2k orders` instead of `1234` rows).

### Root Cause of AI Failure
The AI model relies strictly on a literal interpretation of the concise feature statement, optimizing for mathematically clean formulas while lacking the implicit domain knowledge of commercial accounting practices and asynchronous database architectures.