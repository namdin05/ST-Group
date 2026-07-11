# Bug report

## FR01

### BUG-001 – Backend allows user registration with missing mandatory 'name' field

| Field | Details |
| :--- | :--- |
| **Bug ID** | BUG-001 |
| **Severity** | High |
| **Priority** | High |
| **Steps to reproduce** | 1. Mở Postman và tạo một request mới với phương thức `POST` gửi tới endpoint `http://localhost:3000/api/register`. <br>2. Cấu hình thẻ Headers: `Content-Type: application/json`. <br>3. Tại thẻ Body, chọn định dạng `raw` -> `JSON` và nhập payload cố tình loại bỏ hoàn toàn trường `name` :<br>`{ "email": "newuser@example.com", "password": "Password123!" }`<br>4. Nhấn nút **Send** để thực thi request. |
| **Actual result** | Hệ thống chấp nhận request thiếu an toàn, trả về mã trạng thái `200 OK` kèm thông báo đăng ký thành công: `{"message":"User registered successfully","id":5}` công khai trong Response Body (Minh chứng chi tiết trong file ảnh `image_d0e9e4.png`). |
| **Expected result** | Backend bắt buộc phải chặn request này, trả về mã lỗi HTTP Client Error (`400 Bad Request` hoặc `422 Unprocessable Entity`) kèm thông báo lỗi rõ ràng yêu cầu phải cung cấp trường `name` (Họ Tên) theo quy định bắt buộc của đặc tả hệ thống. |
| **GitHub Issue link** | https://github.com/namdin05/ST-Group/issues/38 |
| **Environment** | Postman Client / Node.js Backend App running on `localhost:3000` |

### BUG-002 – Backend allows user registration with missing mandatory 'email' field

| Field | Details |
| :--- | :--- |
| **Bug ID** | BUG-002 |
| **Severity** | High |
| **Priority** | High |
| **Steps to reproduce** | 1. Mở Postman và tạo một request mới với phương thức `POST` gửi tới endpoint `http://localhost:3000/api/register`.<br>2. Cấu hình thẻ Headers: `Content-Type: application/json`.<br>3. Tại thẻ Body, chọn định dạng `raw` -> `JSON` và nhập payload cố tình loại bỏ trường `email` :<br>`{ "name": "Nguyen Van A", "password": "Password123!" }`<br>4. Nhấn nút **Send** để thực thi request. |
| **Actual result** | Hệ thống chấp nhận request lỗi, trả về mã trạng thái `200 OK` kèm thông báo thành công: `{"message":"User registered successfully","id":6}` công khai trong Response Body (Minh chứng chi tiết trong file ảnh `image_d05e7c.png`). |
| **Expected result** | Backend bắt buộc phải chặn request này, trả về mã lỗi HTTP Client Error (`400 Bad Request` hoặc `422 Unprocessable Entity`) kèm thông báo lỗi rõ ràng yêu cầu phải cung cấp trường `email`. Không cho phép chèn bản ghi lỗi vào database. |
| **GitHub Issue link** | https://github.com/namdin05/ST-Group/issues/39 |
| **Environment** | Postman Client / Node.js Backend App running on `localhost:3000` |

### BUG-003 – Backend allows user registration with missing mandatory 'password' field

| Field | Details |
| :--- | :--- |
| **Bug ID** | BUG-003 |
| **Severity** | High |
| **Priority** | High |
| **Steps to reproduce** | 1. Mở Postman và tạo một request mới với phương thức `POST` gửi tới endpoint `http://localhost:3000/api/register`. <br>2. Cấu hình thẻ Headers: `Content-Type: application/json`. <br>3. Tại thẻ Body, chọn định dạng `raw` -> `JSON` và nhập payload cố tình loại bỏ hoàn toàn trường `password`:<br>`{ "name": "Nguyen Van A", "email": "newuser@example.com" }`<br>4. Nhấn nút **Send** để thực thi request. |
| **Actual result** | Hệ thống chấp nhận request thiếu an toàn, trả về mã trạng thái `200 OK` kèm thông báo đăng ký thành công: `{"message":"User registered successfully","id":7}` công khai trong Response Body (Minh chứng chi tiết trong file ảnh `image_d0cb03.png`). |
| **Expected result** | Backend bắt buộc phải chặn request này, trả về mã lỗi HTTP Client Error (`400 Bad Request` hoặc `422 Unprocessable Entity`) kèm thông báo lỗi rõ ràng yêu cầu phải cung cấp mật khẩu hợp lệ theo chính sách của hệ thống. Tuyệt đối không tạo tài khoản trống mật khẩu trong cơ sở dữ liệu. |
| **GitHub Issue link** | https://github.com/namdin05/ST-Group/issues/40 |
| **Environment** | Postman Client / Node.js Backend App running on `localhost:3000` |

### BUG-004 – Backend allows user registration with completely invalid email format

| Field | Details |
| :--- | :--- |
| **Bug ID** | BUG-004 |
| **Severity** | High |
| **Priority** | High |
| **Steps to reproduce** | 1. Mở Postman và tạo một request mới với phương thức `POST` gửi tới endpoint `http://localhost:3000/api/register`. <br>2. Cấu hình thẻ Headers: `Content-Type: application/json`. <br>3. Tại thẻ Body, chọn định dạng `raw` -> `JSON` và nhập một chuỗi không có định dạng email (thiếu ký tự `@`) vào trường `email` :<br>`{ "name": "Nguyen Van A", "email": "facebook.com", "password": "Password123!" }`<br>4. Nhấn nút **Send** để thực thi request. |
| **Actual result** | Hệ thống hoàn toàn không kiểm tra cấu trúc email ở phía backend, trả về mã trạng thái `200 OK` kèm thông báo đăng ký thành công: `{"message":"User registered successfully","id":9}` công khai trong Response Body (Minh chứng chi tiết trong file ảnh `image_d0d37b.png`). |
| **Expected result** | Backend bắt buộc phải có bộ lọc kiểm tra định dạng (Email format validation), chặn đứng request lỗi này và trả về mã lỗi HTTP Client Error (`400 Bad Request` hoặc `422 Unprocessable Entity`) thông báo email không hợp lệ. |
| **GitHub Issue link** | https://github.com/namdin05/ST-Group/issues/41 |
| **Environment** | Postman Client / Node.js Backend App running on `localhost:3000` |

### BUG-005 – Backend allows user registration with password length below the minimum requirement (< 8 characters)

| Field | Details |
| :--- | :--- |
| **Bug ID** | BUG-005 |
| **Severity** | High |
| **Priority** | High |
| **Steps to reproduce** | 1. Mở Postman và tạo một request mới với phương thức `POST` gửi tới endpoint `http://localhost:3000/api/register`. <br>2. Cấu hình thẻ Headers: `Content-Type: application/json`. <br>3. Tại thẻ Body, chọn định dạng `raw` -> `JSON` và nhập một chuỗi mật khẩu chỉ có 7 ký tự (vừa vặn nằm dưới biên tối thiểu 8 ký tự) nhưng có đủ các lớp ký tự phức tạp để cô lập lỗi độ dài:<br>`{ "name": "Nguyen Van A", "email": "newuser@example.com", "password": "Passw1!" }`<br>4. Nhấn nút **Send** để thực thi request. |
| **Actual result** | Hệ thống hoàn toàn bỏ sót việc kiểm tra độ dài tối thiểu của mật khẩu ở tầng backend, phê duyệt request lỗi và trả về mã trạng thái `200 OK` kèm thông báo đăng ký thành công: `{"message":"User registered successfully","id":11}` công khai trong Response Body (Minh chứng chi tiết trong file ảnh `image_d1b873.png`). |
| **Expected result** | Backend bắt buộc phải kiểm tra điều kiện độ dài mật khẩu $\ge$ 8 ký tự, chặn đứng request này và trả về mã lỗi HTTP Client Error (`400 Bad Request` hoặc `422 Unprocessable Entity`) thông báo mật khẩu quá ngắn để đảm bảo an toàn hệ thống. |
| **GitHub Issue link** | https://github.com/namdin05/ST-Group/issues/46 |
| **Environment** | Postman Client / Node.js Backend App running on `localhost:3000` |

### BUG-006 – Backend allows duplicate email registration violating uniqueness constraint

| Field | Details |
| :--- | :--- |
| **Bug ID** | BUG-006 |
| **Severity** | High |
| **Priority** | High |
| **Steps to reproduce** | 1. Mở Postman và tạo một request `POST` gửi tới endpoint `http://localhost:3000/api/register`. <br>2. Cấu hình thẻ Headers: `Content-Type: application/json`. <br>3. Tại thẻ Body, chọn định dạng `raw` -> `JSON` và nhập một payload hoàn chỉnh với một email chưa từng tồn tại trên hệ thống để đăng ký tài khoản thứ nhất (Ví dụ: `existing@domain.com`). <br>4. Nhấn nút **Send** để tạo tài khoản đầu tiên thành công.<br>5. Giữ nguyên toàn bộ thông tin payload đó (đặc biệt là trường `email`), tiếp tục nhấn nút **Send** một lần nữa để cố tình đăng ký trùng lặp tài khoản thứ hai. |
| **Actual result** | Hệ thống hoàn toàn không có cơ chế check trùng lặp (Uniqueness check) hoặc cơ sở dữ liệu thiếu ràng buộc `UNIQUE` cho cột email. Backend phê duyệt cả hai request trùng lặp này với mã trạng thái `200 OK` và cấp các bản ghi người dùng mới với ID tăng tiến (Minh chứng chi tiết trong file ảnh bằng chứng `image_dd11c3.png` và `image_dd11dc.png`). |
| **Expected result** | Ở lượt gửi request thứ hai, backend bắt buộc phải check ra email đã tồn tại trong hệ thống, chặn đứng hành vi đăng ký trùng lặp và trả về mã lỗi HTTP Client Error (`400 Bad Request` hoặc `409 Conflict`) kèm thông báo rõ ràng: "Email đã được sử dụng". |
| **GitHub Issue link** | https://github.com/namdin05/ST-Group/issues/42 |
| **Environment** | Postman Client / Node.js Backend App running on `localhost:3000` |

### BUG-007 – System falsely rejects valid strong password meeting all complexity requirements

| Field | Details |
| :--- | :--- |
| **Bug ID** | BUG-007 |
| **Severity** | High |
| **Priority** | High |
| **Steps to reproduce** | 1. Mở trang Đăng ký (Register page) trên giao diện Web.<br>2. Nhập trường Họ Tên hợp lệ.<br>3. Nhập một Email hợp lệ và duy nhất chưa từng tồn tại trên hệ thống.<br>4. Nhập mật khẩu: `Password1!` (Lưu ý: Mật khẩu này dài 10 ký tự, có chữ hoa 'P', chữ thường, số '1' và ký tự đặc biệt '!' nằm trong tập cho phép).<br>5. Nhấn nút Submit để gửi form đăng ký. |
| **Actual result** | Hệ thống đánh giá sai logic validation, hiển thị thông báo lỗi "Mật khẩu quá yếu" và chặn hoàn toàn luồng đăng ký của người dùng. |
| **Expected result** | Theo đặc tả FR-01, hệ thống phải phê duyệt và tạo tài khoản thành công do mật khẩu `Password1!` đã thỏa mãn toàn bộ các điều kiện bắt buộc (Chiều dài $\ge$ 8, có chứa chữ hoa, chữ thường, số và ký tự đặc biệt hợp lệ). |
| **GitHub Issue link** | https://github.com/namdin05/ST-Group/issues/19 |
| **Environment** | Web Frontend |

### BUG-008 – Missing string length validation and text truncation on user display name breaks UI layout

| Field | Details |
| :--- | :--- |
| **Bug ID** | BUG-008 |
| **Severity** | High |
| **Priority** | Medium |
| **Steps to reproduce** | 1. Đăng ký hoặc cập nhật tài khoản với một chuỗi Họ Tên siêu dài (Ví dụ: Một đoạn văn văn bản dài hơn 500 ký tự).<br>2. Đăng nhập vào hệ thống EShop.<br>3. Truy cập vào trang cá nhân/dashboard để quan sát thanh điều hướng header phía trên cùng (Navbar Header). |
| **Actual result** | Hệ thống không hề chặn độ dài ký tự của trường Họ Tên và cũng không xử lý cắt chuỗi tự động (`text-overflow`) trên giao diện hiển thị. Toàn bộ đoạn văn tên siêu dài hiển thị tràn ra, chiếm gần hết thanh Header và làm gãy Layout, đẩy nút "Thoát" lệch vị trí so với thiết kế chuẩn (Minh chứng chi tiết trong file ảnh bằng chứng `image_df7585.png`). |
| **Expected result** | Trên giao diện hiển thị (UI Layout), chuỗi tên người dùng trên thanh điều hướng bắt buộc phải được khống chế độ dài hiển thị cố định hoặc sử dụng kỹ thuật CSS/JS để tự động ẩn/cắt bớt bằng dấu ba chấm (Ví dụ: `Công nghệ thông tin đang đóng...`) để giữ nguyên vẹn bố cục cấu trúc của Header và các nút chức năng đi kèm như nút "Thoát". |
| **GitHub Issue link** | https://github.com/namdin05/ST-Group/issues/43 |
| **Environment** | Web Frontend |

### BUG-009 - Missing mandatory 'Confirm Password' input field on the registration page

| Field | Details |
| :--- | :--- |
| **Bug ID** | BUG-009 |
| **Severity** | Critical |
| **Priority** | High |
| **Steps to reproduce** | 1. Điều hướng tới trang Đăng ký (Register page) trên giao diện hệ thống.<br>2. Quan sát toàn bộ các trường nhập liệu (input fields) được hiển thị trên form đăng ký. |
| **Actual result** | Trang đăng ký chỉ hiển thị vỏn vẹn 3 trường: Họ tên (Name), Email, và Mật khẩu (Password). Hoàn toàn không xuất hiện trường Xác nhận mật khẩu (Confirm Password). |
| **Expected result** | Form đăng ký bắt buộc phải tích hợp trường "Xác nhận mật khẩu" (Confirm Password) để người dùng tái nhập và kiểm tra độ khớp của mật khẩu trước khi tiến hành gửi biểu mẫu, hạn chế tối đa rủi ro gõ sai mật khẩu khi tạo tài khoản. |
| **GitHub Issue link** | https://github.com/namdin05/ST-Group/issues/18 |
| **Environment** | Web Frontend |

## FR-07: Shopping cart

### BUG-001 – Duplicate rows created for the same product in the shopping cart instead of incrementing quantity

| Field | Details |
| :--- | :--- |
| **Bug ID** | BUG-001 |
| **Severity** | High |
| **Priority** | High |
| **Steps to reproduce** | 1. Truy cập vào trang danh sách sản phẩm (Product List page).<br>2. Tiến hành thêm Sản phẩm A vào giỏ hàng (Add to cart).<br>3. Tiếp tục nhấn thêm Sản phẩm A vào giỏ hàng một lần nữa.<br>4. Mở trang Giỏ hàng (Shopping Cart) để quan sát dữ liệu hiển thị. |
| **Actual result** | Hệ thống không thực hiện cơ chế cộng dồn số lượng cho sản phẩm trùng lặp. Mỗi lần thêm Sản phẩm A, hệ thống lại tự động tạo ra một dòng mới (new cart row) hoàn toàn biệt lập trong giỏ hàng, vi phạm logic xử lý e-commerce. |
| **Expected result** | Theo đặc tả yêu cầu của FR-07, Sản phẩm A bắt buộc phải hiển thị duy nhất trên một dòng (single row), và số lượng (quantity) của dòng đó phải được tự động tăng tiến cộng dồn tương ứng với số lần người dùng nhấn thêm. |
| **GitHub Issue link** | https://github.com/namdin05/ST-Group/issues/20 |
| **Environment** | Web Frontend |

### BUG-002 – Missing quantity adjustment (+/-) buttons in the shopping cart table

| Field | Details |
| :--- | :--- |
| **Bug ID** | BUG-002 |
| **Severity** | Medium |
| **Priority** | Medium |
| **Steps to reproduce** | 1. Tiến hành thêm một sản phẩm bất kỳ vào giỏ hàng (Add to cart).<br>2. Mở giao diện trang Giỏ hàng (Shopping Cart).<br>3. Di chuyển tới cột Số lượng (Quantity) trong bảng giỏ hàng để quan sát các thành phần giao diện. |
| **Actual result** | Cột số lượng hiển thị đơn thuần một giá trị số tĩnh, hoàn toàn không xuất hiện bất kỳ nút bấm tăng/giảm (+/-) nào để người dùng tương tác chỉnh sửa dữ liệu. |
| **Expected result** | Theo đúng đặc tả tham chiếu của FR-07, cột Số lượng bắt buộc phải tích hợp đầy đủ hai nút bấm tăng `+` và giảm `-` đi kèm, cho phép người dùng thay đổi số lượng mua hàng trực tiếp trên giao diện một cách trực quan. |
| **GitHub Issue link** | https://github.com/namdin05/ST-Group/issues/21 |
| **Environment** | Web Frontend |

### BUG-003 – Incorrect UI text label used for cart total amount instead of 'Tổng cộng'

| Field | Details |
| :--- | :--- |
| **Bug ID** | BUG-003 |
| **Severity** | Low |
| **Priority** | Medium |
| **Steps to reproduce** | 1. Tiến hành thêm sản phẩm bất kỳ vào giỏ hàng.<br>2. Điều hướng tới trang Giỏ hàng (Shopping Cart).<br>3. Quan sát phần hiển thị tổng tiền ở góc dưới cùng bên trái của bảng giỏ hàng. |
| **Actual result** | Hệ thống hiển thị sai nhãn văn bản (Text label) thành "Tổng tạm tính: 56,000,000 ₫" (Minh chứng chi tiết trong file ảnh bằng chứng `image_ec20c2.png`). |
| **Expected result** | Theo đúng đặc tả tham chiếu của tính năng FR-07, nhãn hiển thị số tiền tổng của toàn bộ giỏ hàng bắt buộc phải viết chính xác là **"Tổng cộng"**. |
| **GitHub Issue link** | https://github.com/namdin05/ST-Group/issues/44 |                                       
| **Environment** | Web Frontend |

### BUG-004 – Missing confirmation dialog when clicking the product delete button in the cart

| Field | Details |
| :--- | :--- |
| **Bug ID** | BUG-004 |
| **Severity** | Medium |
| **Priority** | Medium |
| **Steps to reproduce** | 1. Tiến hành thêm một sản phẩm bất kỳ vào giỏ hàng.<br>2. Điều hướng tới giao diện trang Giỏ hàng (Shopping Cart).<br>3. Tìm tới sản phẩm vừa thêm và nhấn vào nút **Xóa** (Delete button) ở cột Thao tác. |
| **Actual result** | Hệ thống lập tức xóa sản phẩm ra khỏi giỏ hàng ngay khi người dùng nhấn nút mà không hiển thị bất kỳ hộp thoại hay thông báo xác nhận nào, tăng rủi ro người dùng bấm nhầm. |
| **Expected result** | Theo đúng đặc tả tham chiếu của tính năng FR-07, hệ thống bắt buộc phải hiển thị một hộp thoại (Confirmation Dialog) để hỏi lại người dùng; hành vi đột biến xóa sản phẩm khỏi giỏ chỉ được phép thực thi sau khi người dùng đã nhấn xác nhận. |
| **GitHub Issue link** | https://github.com/namdin05/ST-Group/issues/22 |
| **Environment** | Web Frontend |

### BUG-005 – Empty-state illustration is missing on the empty shopping cart screen

| Field | Details |
| :--- | :--- |
| **Bug ID** | BUG-005 |
| **Severity** | Low |
| **Priority** | Medium |
| **Steps to reproduce** | 1. Đảm bảo giỏ hàng hiện tại chưa có sản phẩm nào (hoặc tiến hành xóa toàn bộ sản phẩm khỏi giỏ hàng).<br>2. Điều hướng tới trang Giỏ hàng (Shopping Cart).<br>3. Quan sát các thành phần hiển thị trực quan trên màn hình trạng thái trống (Empty state). |
| **Actual result** | Giao diện chỉ hiển thị văn bản thuần "Giỏ hàng của bạn đang trống" và đường link "Tiếp tục mua sắm". Thành phần hình ảnh minh họa (`Empty-state illustration`) hoàn toàn bị biến mất, tạo ra một khoảng không trống trải sai lệch bố cục thiết kế (Minh chứng chi tiết trong file ảnh bằng chứng `image_ed817f.png`). |
| **Expected result** | Theo đúng đặc tả thiết kế, màn hình giỏ hàng trống phải xuất hiện đầy đủ 3 thành phần đồng thời: Hình ảnh minh họa trạng thái trống (`Empty-state illustration`), thông điệp rõ ràng (`Clear message`), và đường dẫn tiếp tục mua sắm (`Continue-shopping link`). |
| **GitHub Issue link** | https://github.com/namdin05/ST-Group/issues/45 |
| **Environment** | Web Frontend |

### BUG-006 – API allows duplicate items in cart array instead of merging and incrementing quantity

| Field | Details |
| :--- | :--- |
| **Bug ID** | BUG-006 |
| **Severity** | High |
| **Priority** | High |
| **Steps to reproduce** | 1. Gửi request `POST /api/cart` lần thứ nhất với payload chứa thông tin Sản phẩm A (Ví dụ: `id: 1`, `name: "iPhone 15 Pro Max"`).<br>2. Tiếp tục gửi request `POST /api/cart` lần thứ hai với chính payload của Sản phẩm A đó để cố tình thêm trùng lặp.<br>3. Gửi request `GET /api/cart` để lấy về cấu trúc mảng dữ liệu giỏ hàng hiện tại và quan sát Response JSON. |
| **Actual result** | Hệ thống không hề gộp sản phẩm mà trả về một mảng chứa phần tử `null` và phân tách sản phẩm trùng lặp thành 2 object riêng biệt có cùng ID nằm trên 2 dòng dữ liệu khác nhau:<br>`[null,{"id":1,"name":"iPhone 15 Pro Max","price":30000000,"quantity":1},{"id":1,"name":"iPhone 15 Pro Max","price":30000000,"quantity":1}]` |
| **Expected result** | Mảng dữ liệu trả về từ API bắt buộc phải xử lý gộp logic (Data normalization). Chỉ duy nhất một logical item của sản phẩm đó được giữ lại trong danh sách và trường `quantity` phải được tự động cộng dồn tăng lên thành `2` thay vì tạo dòng mới rác dữ liệu. |
| **GitHub Issue link** | https://github.com/namdin05/ST-Group/issues/50 |
| **Environment** | Backend API Testing (Postman) |

### BUG-007 – Backend API accepts malformed and missing field payloads in cart mutation

| Field | Details |
| :--- | :--- |
| **Bug ID** | BUG-007 |
| **Severity** | High |
| **Priority** | High |
| **Steps to reproduce** | 1. Gửi request `POST /api/cart` với payload sai tên thuộc tính (Ví dụ: truyền `"nameee"` thay vì `"name"`).<br>2. Tiếp tục gửi một request `POST /api/cart` khác với payload thiếu hoàn toàn trường bắt buộc (Ví dụ: không truyền trường `"quantity"`).<br>3. Gửi request `GET /api/cart` để kiểm tra cấu trúc mảng dữ liệu hiện tại của giỏ hàng. |
| **Actual result** | Backend không hề kiểm tra tính hợp lệ của dữ liệu đầu vào (Missing request body validation). Hệ thống vẫn chấp nhận xử lý, làm biến đổi trạng thái giỏ hàng và trả về một mảng chứa cả phần tử rác, thuộc tính sai, lẫn object thiếu trường dữ liệu:<br>`[null,{"id":1,"name":"iPhone 15 Pro Max","price":30000000,"quantity":1},{"id":1,"name":"iPhone 15 Pro Max","price":30000000,"quantity":1},{"id":1,"nameee":"iPhone 15 Pro Max","price":30000000,"quantity":1},{"id":1,"name":"iPhone 15 Pro Max","price":30000000}]` |
| **Expected result** | Hệ thống bắt buộc phải từ chối các request có payload không hợp lệ (Missing quantity, non-numeric quantity, quantity $\le$ 0, hoặc malformed fields). API phải trả về mã lỗi thích hợp (Ví dụ: `400 Bad Request`) và đảm bảo trạng thái dữ liệu giỏ hàng trên server không bị biến đổi (Cart is not mutated). |
| **GitHub Issue link** | https://github.com/namdin05/ST-Group/issues/51 |
| **Environment** | Backend API Testing (Postman) |

## FR-13: Dashboard Admin

### BUG-001 – Dashboard calculates Total Revenue incorrectly (revenue is doubled)

| Field | Details |
| :--- | :--- |
| **Bug ID** | BUG-001 |
| **Severity** | High |
| **Priority** | High |
| **Steps to reproduce** | 1. Đăng nhập vào hệ thống với tài khoản Quản trị viên (Admin).<br>2. Điều hướng tới trang Bảng điều khiển (Dashboard).<br>3. Đảm bảo dữ liệu hệ thống đang có chính xác 2 đơn hàng ở trạng thái giao thành công (`status = 'delivered'`) với giá trị `total_amount` của mỗi đơn là 28,000,000 ₫ (Tổng doanh thu thực tế phải là 56,000,000 ₫).<br>4. Quan sát giá trị Tổng doanh thu (Total Revenue) hiển thị trên màn hình Dashboard. |
| **Actual result** | Giao diện Dashboard hiển thị sai lệch số liệu: `112,000,136 VND`. Thuật toán xử lý tính toán doanh thu ở phía backend hoặc hàm sum dữ liệu đang bị lỗi khiến kết quả hiển thị bị nhân đôi so với thực tế. |
| **Expected result** | Theo đúng quy định đặc tả của FR-13, Tổng doanh thu hiển thị bắt buộc phải tính chính xác: Chỉ tính tổng `total_amount` của các đơn có `status = 'delivered'`. Với dữ liệu mẫu, con số hiển thị phải là: **56,000,000 ₫**. |
| **GitHub Issue link** | https://github.com/namdin05/ST-Group/issues/23 |
| **Environment** | Web Admin Dashboard / Backend API Analytics |

## FR-06: Mobile Product Detail

### BUG-001 – System allows adding a product to the cart with a quantity of zero (0)

| Field | Details |
| :--- | :--- |
| **Bug ID** | BUG-001 |
| **Severity** | High |
| **Priority** | High |
| **Steps to reproduce** | 1. Truy cập vào trang chi tiết sản phẩm (Product Detail page).<br>2. Tại ô nhập số lượng (Quantity field), tiến hành nhập giá trị `0`.<br>3. Nhấn vào nút **Thêm vào giỏ hàng** (Add to cart).<br>4. Điều hướng tới trang Giỏ hàng để kiểm tra trạng thái. |
| **Actual result** | Hệ thống hoàn toàn không có cơ chế chặn hoặc chuẩn hóa dữ liệu đầu vào. Sản phẩm vẫn được thêm vào giỏ hàng thành công với số lượng bằng `0`, gây sai lệch logic tính toán tổng tiền và luồng thanh toán (Checkout flow). |
| **Expected result** | Hệ thống bắt buộc phải từ chối hành vi này. Hệ thống phải chặn đứng hành động thêm vào giỏ (hiển thị thông báo lỗi) hoặc tự động chuẩn hóa (normalize) giá trị về số lượng tối thiểu hợp lệ là `1`. |
| **GitHub Issue link** | https://github.com/namdin05/ST-Group/issues/47 |
| **Environment** | Mobile App |

### BUG-002 – Input field allows pasting/entering invalid quantity (negative number)

| Field | Details |
| :--- | :--- |
| **Bug ID** | BUG-002 |
| **Severity** | High |
| **Priority** | High |
| **Steps to reproduce** | 1. Sao chép một số có giá trị nhỏ hơn 1 (Ví dụ: -1).<br>2. Thực hiện hành động dán (Paste) giá trị này vào ô nhập số lượng trong giỏ hàng (hoặc dùng các ký tự đặc biệt để gõ số âm nếu giao diện sót lỗi).<br>3. Nhấn nút cập nhật số lượng hoặc tiến hành lưu thông tin. |
| **Actual result** | Ô nhập liệu vẫn ghi nhận giá trị âm mà không hề có cảnh báo lỗi, cho phép luồng nghiệp vụ tiếp tục chạy với dữ liệu sai trái. |
| **Expected result** | Hệ thống phải thực hiện validate giá trị biên dưới (Boundary Check). Nếu người dùng cố tình dán hoặc nhập số lượng âm, hệ thống bắt buộc phải tự động đưa giá trị về mức tối thiểu hợp lệ là `1` hoặc hiển thị thông báo lỗi chặn không cho thực thi hành động. |
| **GitHub Issue link** | https://github.com/namdin05/ST-Group/issues/48 |
| **Environment** | Mobile App |

### BUG-003 – Input field allows pasting non-numeric text breaking data validation

| Field | Details |
| :--- | :--- |
| **Severity** | Medium |
| **Priority** | High |
| **Steps to reproduce** | 1. Sao chép (Copy) một đoạn văn bản (chữ thuần) bất kỳ từ bên ngoài.<br>2. Truy cập vào giao diện nhập số lượng mặt hàng.<br>3. Sử dụng tổ hợp phím `Ctrl + V` (hoặc chuột phải chọn Paste) để dán đoạn văn bản đó vào ô nhập số lượng.<br>4. Quan sát giá trị hiển thị trong ô nhập và nhấn nút thực thi hành động (ví dụ: Cập nhật hoặc Thêm vào giỏ). |
| **Actual result** | Ô nhập liệu vẫn chấp nhận và hiển thị chuỗi ký tự chữ thuần vừa dán, hệ thống không tự động lọc bỏ ký tự lạ hoặc chặn hành vi dán dữ liệu sai kiểu, dẫn đến nguy cơ làm gãy logic tính toán số và lỗi hệ thống phía sau. |
| **Expected result** | Hệ thống phải thực hiện kiểm tra dữ liệu khi dán (Paste validation). Ô nhập liệu bắt buộc phải từ chối chuỗi văn bản không phải là số (hoặc tự động xóa bỏ hoàn toàn các ký tự không phải số ngay khi vừa dán vào). |
| **GitHub Issue link** | https://github.com/namdin05/ST-Group/issues/49 |
| **Environment** | Mobile App |