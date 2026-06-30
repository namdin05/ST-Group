# FR-02 Mobile: Đăng nhập & Khóa tài khoản 
FR-02 ở mobile chỉ nói mobile có chức năng Đăng nhập, nhưng **không bổ sung bất kỳ ràng buộc mới nào** so với FR-02. Logic đăng nhập & khóa tài khoản dùng **cùng backend API**, nghĩa là:

  - Cùng biến input (V1: Email, V2: Password)
  - Cùng biến trạng thái (S1–S5)
  - Cùng biến output (O1–O6)
  - Cùng business logic (bộ đếm, khóa 30s, JWT Token)

  ### Sự khác biệt thực tế giữa Web và Mobile:

  | Khía cạnh | Web (React + Vite) | Mobile (React Native + Expo) |
  |---|---|---|
  | Validation email HTML5 (`type="email"`) | Có — trình duyệt validate | **Không có** — React Native không dùng HTML5 `type="email"` |
  | Vị trí lỗi (trên nút submit - FR-22) | Áp dụng FR-22 | FR-22 là GUI Requirements cho **web** — mobile có UI layout riêng |
  | Lưu trữ Token | `localStorage` / cookie | `AsyncStorage` / SecureStore |
  | Keyboard behavior | Bàn phím vật lý | Bàn phím ảo (có thể che form) |

  ### Kết luận: **Không cần bổ sung EC hay TC mới**

  Toàn bộ **23 ECs và 15 TCs** từ FR-02 web đều áp dụng được cho mobile vì:

  1. **Logic nghiệp vụ giống hệt** — cùng backend API
  2. **EC1–EC23 không thay đổi** — tất cả phân hoạch vẫn đúng trên mobile
  3. **BVA (BV1–BV8) không thay đổi** — boundary giá trị giống nhau
  4. FR-20 **không thêm ràng buộc mới** nào cho đăng nhập trên mobile

  Sự khác biệt chỉ ở **cách thực thi test** (dùng Expo thay vì trình duyệt), không ở thiết kế test case.