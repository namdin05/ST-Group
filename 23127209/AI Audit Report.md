# AI Audit Report - Nhật ký tương tác AI

> "I use AI tools for the following tasks,"

---

## Log Entry #1

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-06-25 10:43:51 (GMT+7)
- **Prompt:**
  > Tôi đang làm domain testing. Đọc functional requirement trong README.md. Với yêu cầu FR02 - Login and account lockout, xác định cho tôi các biến đầu vào (Input Variables) và Miền giá trị (Domains)
- **Output:**

  ## FR-02: Đăng nhập & Khóa tài khoản — Bước 1: Input Variables & Domains

  ### A. Biến đầu vào trực tiếp (UI Input Variables)

  | # | Biến | Kiểu | Miền giá trị (Domain) | Nguồn đặc tả |
  |---|---|---|---|---|
  | V1 | **Email** | String | Chuỗi ký tự, field dùng `type="email"` (có validate HTML5). Phải đúng format `user@domain.com` | FR-02, FR-22 |
  | V2 | **Mật khẩu (Password)** | String | Chuỗi ký tự, field dùng `type="password"`. Không có ràng buộc cụ thể về format khi login (khác với đăng ký) | FR-02, FR-22 |

  ### B. Biến trạng thái hệ thống (System State / Database Variables)

  | # | Biến | Kiểu | Miền giá trị (Domain) | Nguồn đặc tả |
  |---|---|---|---|---|
  | S1 | **Trạng thái tồn tại của email** | Boolean | {Email tồn tại trong DB, Email không tồn tại} | FR-02 (ngầm định) |
  | S2 | **Sự khớp email-password** | Boolean | {Mật khẩu đúng cho email, Mật khẩu sai cho email} | FR-02 |
  | S3 | **Bộ đếm đăng nhập sai liên tiếp (failedAttempts)** | Integer | ≥ 0; ngưỡng khóa: ≥ 3 lần sai liên tiếp | FR-02: "tăng đúng 1 đơn vị", "sai từ 3 lần trở lên" |
  | S4 | **Trạng thái khóa tài khoản** | Enum | {Không bị khóa, Đang bị khóa tạm thời (30 giây)} | FR-02: "tạm khóa 30 giây" |
  | S5 | **Thời gian khóa còn lại** | Integer (giây) | 0 – 30 giây (hết 30s → tự mở khóa) | FR-02 |

  ### C. Biến đầu ra (Output Variables)

  | # | Biến | Kiểu | Miền giá trị (Domain) | Nguồn đặc tả |
  |---|---|---|---|---|
  | O1 | **Kết quả đăng nhập** | Enum | {Thành công (trả JWT Token), Thất bại} | FR-02 |
  | O2 | **JWT Token** | String / null | Token hợp lệ khi thành công, null khi thất bại | FR-02: "trả về JWT Token" |
  | O3 | **Thông báo lỗi** | String | Thông báo phù hợp, **không để lộ chi tiết nguyên nhân** (không cho biết email sai hay mật khẩu sai) | FR-02 |
  | O4 | **Vị trí thông báo lỗi** | UI Position | Phải hiển thị **trên** nút submit | FR-22 |
  | O5 | **Bộ đếm failedAttempts sau thao tác** | Integer | Tăng đúng 1 nếu sai; reset về 0 nếu đúng | FR-02 |
  | O6 | **Trạng thái khóa sau thao tác** | Enum | {Không khóa, Kích hoạt khóa 30s (nếu failedAttempts ≥ 3)} | FR-02 |

---

## Log Entry #2

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-06-25 12:09:49 (GMT+7)
- **Prompt:**
  > Bây giờ chuyển sang bước 2 Xác định các Phân hoạch Tương đương (Equivalence Classes)
- **Output:**

  ## FR-02: Đăng nhập & Khóa tài khoản — Bước 2: Equivalence Classes

  ### Biến V1: Email (Input từ UI)

  **Nguyên tắc áp dụng:** "Must be" (format hợp lệ) + chia nhỏ trường hợp rỗng

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC1 | ✅ Valid | Email có format hợp lệ (đúng dạng `user@domain.com`, pass HTML5 `type="email"` validation) | Must be — thỏa mãn |
  | EC2 | ❌ Invalid | Email rỗng (không nhập gì) | Must be — không thỏa mãn |
  | EC3 | ❌ Invalid | Email format không hợp lệ (thiếu `@`, thiếu domain, thiếu local part, v.v.) | Must be — không thỏa mãn |

  ### Biến S1: Trạng thái tồn tại email trong DB

  **Nguyên tắc áp dụng:** "Must be" (email phải tồn tại)

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC4 | ✅ Valid | Email tồn tại trong hệ thống | Must be — thỏa mãn |
  | EC5 | ❌ Invalid | Email không tồn tại trong hệ thống | Must be — không thỏa mãn |

  ### Biến V2: Mật khẩu (Input từ UI)

  **Nguyên tắc áp dụng:** "Must be" (không rỗng)

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC6 | ✅ Valid | Password không rỗng (có nhập giá trị) | Must be — thỏa mãn |
  | EC7 | ❌ Invalid | Password rỗng (không nhập gì) | Must be — không thỏa mãn |

  ### Biến S2: Sự khớp Email-Password

  **Nguyên tắc áp dụng:** "Must be" (password phải đúng)

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC8 | ✅ Valid | Password khớp với tài khoản tương ứng | Must be — thỏa mãn |
  | EC9 | ❌ Invalid | Password không khớp với tài khoản | Must be — không thỏa mãn |

  ### Biến S3: Bộ đếm đăng nhập sai liên tiếp (failedAttempts)

  **Nguyên tắc áp dụng:** Range — ngưỡng khóa tại 3

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC10 | ✅ Valid | 0 ≤ failedAttempts ≤ 2 (chưa đạt ngưỡng khóa, cho phép thử đăng nhập) | Range — trong khoảng hợp lệ |
  | EC11 | ❌ Invalid | failedAttempts ≥ 3 (đạt/vượt ngưỡng → kích hoạt khóa tài khoản) | Range — vượt biên trên |

  ### Biến S4: Trạng thái khóa tài khoản

  **Nguyên tắc áp dụng:** "Must be" (tài khoản không bị khóa) + Chia nhỏ theo hết hạn khóa

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC12 | ✅ Valid | Tài khoản không bị khóa (chưa từng khóa hoặc chưa đạt ngưỡng) | Must be — thỏa mãn |
  | EC13 | ✅ Valid | Tài khoản đã từng bị khóa nhưng **đã hết 30 giây** → mở khóa, cho phép thử lại | Chia nhỏ — hành vi khác (reset khóa) |
  | EC14 | ❌ Invalid | Tài khoản **đang bị khóa** (trong vòng 30 giây kể từ lần sai thứ 3+) | Must be — không thỏa mãn |

  > **Lưu ý quan trọng về EC14:** Khi tài khoản đang bị khóa, dù người dùng nhập đúng email + đúng password, hệ thống vẫn phải **từ chối đăng nhập** và trả thông báo lỗi phù hợp.

  ### Bảng tổng hợp

  | Nhóm | Valid ECs | Invalid ECs | Tổng |
  |---|---|---|---|
  | V1 — Email | EC1 | EC2, EC3 | 3 |
  | S1 — Email tồn tại | EC4 | EC5 | 2 |
  | V2 — Password | EC6 | EC7 | 2 |
  | S2 — Khớp password | EC8 | EC9 | 2 |
  | S3 — Bộ đếm sai | EC10 | EC11 | 2 |
  | S4 — Trạng thái khóa | EC12, EC13 | EC14 | 3 |
  | **Tổng** | **6 Valid** | **8 Invalid** | **14 ECs** |

---

## Log Entry #3

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-06-25 12:52:22 (GMT+7)
- **Prompt:**
  > Thiếu testcase bộ đếm tăng đúng 1 lần mỗi lần sai
- **Output:**

  ### Bổ sung — Biến O5: Hành vi bộ đếm failedAttempts (Output)

  **Nguyên tắc áp dụng:** "Must be" (tăng đúng 1 mỗi lần sai) + "Must be" (reset khi thành công — ngầm định từ "liên tiếp")

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC15 | ✅ Valid | Sau mỗi lần đăng nhập sai, bộ đếm tăng **đúng 1 đơn vị** (không phải 0, 2, hay giá trị khác) | Must be — thỏa mãn |
  | EC16 | ❌ Invalid | Sau lần đăng nhập sai, bộ đếm tăng khác 1 (tăng 0, tăng 2, hoặc giảm) | Must be — không thỏa mãn |
  | EC17 | ✅ Valid | Sau đăng nhập thành công, bộ đếm **reset về 0** (do đặc tả yêu cầu "liên tiếp" → thành công phá chuỗi sai) | Must be — thỏa mãn |
  | EC18 | ❌ Invalid | Sau đăng nhập thành công, bộ đếm **không reset** (vẫn giữ giá trị cũ) | Must be — không thỏa mãn |

  ### Bảng tổng hợp (cập nhật)

  | Nhóm | Valid ECs | Invalid ECs | Tổng |
  |---|---|---|---|
  | V1 — Email | EC1 | EC2, EC3 | 3 |
  | S1 — Email tồn tại | EC4 | EC5 | 2 |
  | V2 — Password | EC6 | EC7 | 2 |
  | S2 — Khớp password | EC8 | EC9 | 2 |
  | S3 — Bộ đếm sai | EC10 | EC11 | 2 |
  | S4 — Trạng thái khóa | EC12, EC13 | EC14 | 3 |
  | O5 — Hành vi bộ đếm | EC15, EC17 | EC16, EC18 | 4 |
  | **Tổng** | **8 Valid** | **10 Invalid** | **18 ECs** |

---

## Log Entry #4

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-06-25 12:55:47 (GMT+7)
- **Prompt:**
  > Kiểm tra các biến khác chưa được nhắc tới, đặc biệt là các biến output, có cần xác định các biến đó không
- **Output:**

  ### Rà soát các biến Output chưa có EC

  | Biến Output | Đã có EC? | Phân tích |
  |---|---|---|
  | **O1** — Kết quả đăng nhập (Thành công/Thất bại) | ❌ | Đây là **kết quả tổng hợp** từ các biến input. Không cần EC riêng — sẽ được verify qua test case ở Bước 3 |
  | **O2** — JWT Token | ❌ | "Must be" trả về khi thành công, lưu client, gửi qua `Authorization: Bearer`. Là **verification point** trên test case thành công, không tạo partition mới |
  | **O3** — Thông báo lỗi **không lộ chi tiết** | ❌ ⚠️ | **Cần bổ sung!** Đây là yêu cầu bảo mật quan trọng: hệ thống phải trả cùng một thông báo lỗi chung cho cả "email sai" và "password sai" → đây là hành vi có thể test riêng |
  | **O4** — Vị trí thông báo lỗi (trên nút submit) | ❌ ⚠️ | **Cần bổ sung!** FR-22 yêu cầu rõ ràng: lỗi phải hiển thị **trên** nút submit. Nếu hiển thị **dưới** là vi phạm đặc tả |
  | **O5** — Hành vi bộ đếm | ✅ | Đã bổ sung EC15-EC18 |
  | **O6** — Trạng thái khóa sau thao tác | ❌ | Đã được bao phủ gián tiếp qua S3 (EC11) và S4 (EC14). Không cần EC riêng |

  ### Bổ sung — Biến O3: Thông báo lỗi — Bảo mật (không lộ chi tiết nguyên nhân)

  **Nguyên tắc:** "Must be" — thông báo lỗi phải chung chung, không phân biệt email sai hay password sai

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC19 | ✅ Valid | Khi đăng nhập thất bại (bất kể lý do), hệ thống hiển thị thông báo lỗi **chung chung**, không cho biết cụ thể email hay mật khẩu sai | Must be — thỏa mãn |
  | EC20 | ❌ Invalid | Thông báo lỗi **để lộ chi tiết** (ví dụ: "Email không tồn tại" hoặc "Mật khẩu không đúng") | Must be — không thỏa mãn |

  ### Bổ sung — Biến O4: Vị trí thông báo lỗi trên UI

  **Nguyên tắc:** "Must be" — lỗi phải hiển thị trên nút submit (FR-22)

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC21 | ✅ Valid | Thông báo lỗi hiển thị **trên** nút submit | Must be — thỏa mãn |
  | EC22 | ❌ Invalid | Thông báo lỗi hiển thị **dưới** nút submit hoặc vị trí khác | Must be — không thỏa mãn |

  ### Bảng tổng hợp (cập nhật lần 2)

  | Nhóm | Valid ECs | Invalid ECs | Tổng |
  |---|---|---|---|
  | V1 — Email | EC1 | EC2, EC3 | 3 |
  | S1 — Email tồn tại | EC4 | EC5 | 2 |
  | V2 — Password | EC6 | EC7 | 2 |
  | S2 — Khớp password | EC8 | EC9 | 2 |
  | S3 — Bộ đếm sai | EC10 | EC11 | 2 |
  | S4 — Trạng thái khóa | EC12, EC13 | EC14 | 3 |
  | O5 — Hành vi bộ đếm | EC15, EC17 | EC16, EC18 | 4 |
  | O3 — Thông báo lỗi bảo mật | EC19 | EC20 | 2 |
  | O4 — Vị trí thông báo lỗi | EC21 | EC22 | 2 |
  | **Tổng** | **10 Valid** | **12 Invalid** | **22 ECs** |

---

## Log Entry #5

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-06-25 13:07:21 (GMT+7)
- **Prompt:**
  > Oke dựa vào các class trên, chuyển sang Bước 3: Lựa chọn tập Test Cases tối thiểu (Selecting Test Cases). Tham khảo hướng dẫn trong REQUIREMENT.md
- **Output:**

  ## FR-02: Đăng nhập & Khóa tài khoản — Bước 3: Test Cases tối thiểu

  ### A. Valid Test Cases (kết hợp nhiều Valid ECs)

  | TC ID | Mô tả | Precondition | Email | Password | ECs bao phủ | Expected Output |
  |---|---|---|---|---|---|---|
  | **TC-V1** | Đăng nhập thành công — Happy Path | failedAttempts = 0, tài khoản không bị khóa | `test@eshop.com` | `Test1234!` | EC1, EC4, EC6, EC8, EC10, EC12 | ✅ JWT Token trả về, chuyển hướng thành công |
  | **TC-V2** | Đăng nhập thành công sau hết hạn khóa + Bộ đếm reset | failedAttempts ≥ 3, tài khoản đã bị khóa nhưng **đã qua 30s** | `test@eshop.com` | `Test1234!` | EC13, EC17 | ✅ JWT Token trả về, failedAttempts reset về 0 |

  > **Ghi chú:** 2 test case bao phủ **8/10 Valid ECs**. Các Valid EC còn lại (EC15, EC19, EC21) yêu cầu kịch bản đăng nhập thất bại nên được verify như **output assertions** trên các Invalid test cases bên dưới.

  ### B. Invalid Test Cases (1 Invalid EC mỗi test case)

  | TC ID | Mô tả | Precondition | Email | Password | Invalid EC | Expected Output | Output ECs verified |
  |---|---|---|---|---|---|---|---|
  | **TC-I1** | Email rỗng | — | *(rỗng)* | `Test1234!` | **EC2** | Lỗi validation (HTML5 hoặc form) | EC21 |
  | **TC-I2** | Email format sai | — | `invalid-email` | `Test1234!` | **EC3** | Lỗi validation format email | EC21 |
  | **TC-I3** | Email không tồn tại trong DB | failedAttempts = 0, không khóa | `nobody@test.com` | `Test1234!` | **EC5** | Lỗi chung chung (không lộ "email không tồn tại") | EC19, EC21 |
  | **TC-I4** | Password rỗng | — | `test@eshop.com` | *(rỗng)* | **EC7** | Lỗi validation (field required) | EC21 |
  | **TC-I5** | Password sai (lần đầu) | failedAttempts = 0, không khóa | `test@eshop.com` | `SaiMK@123` | **EC9** | Lỗi chung chung, failedAttempts tăng từ 0 → 1 | EC15, EC19, EC21 |
  | **TC-I6** | Sai lần thứ 3 → Kích hoạt khóa | failedAttempts = 2 (đã sai 2 lần trước) | `test@eshop.com` | `SaiMK@123` | **EC11** | Tài khoản bị khóa 30s, thông báo lỗi phù hợp, failedAttempts = 3 | EC15 |
  | **TC-I7** | Đăng nhập khi đang bị khóa (credentials đúng) | failedAttempts ≥ 3, tài khoản **đang bị khóa** (chưa hết 30s) | `test@eshop.com` | `Test1234!` | **EC14** | ❌ Từ chối dù đúng email + password, thông báo lỗi | EC19 |

  ### C. Ma trận bao phủ EC ↔ Test Case

  | EC ID | Loại | Mô tả | Bao phủ bởi TC |
  |---|---|---|---|
  | EC1 | ✅ Valid | Email format hợp lệ | TC-V1 |
  | EC2 | ❌ Invalid | Email rỗng | TC-I1 |
  | EC3 | ❌ Invalid | Email format sai | TC-I2 |
  | EC4 | ✅ Valid | Email tồn tại trong DB | TC-V1 |
  | EC5 | ❌ Invalid | Email không tồn tại | TC-I3 |
  | EC6 | ✅ Valid | Password không rỗng | TC-V1 |
  | EC7 | ❌ Invalid | Password rỗng | TC-I4 |
  | EC8 | ✅ Valid | Password khớp | TC-V1 |
  | EC9 | ❌ Invalid | Password sai | TC-I5 |
  | EC10 | ✅ Valid | failedAttempts < 3 | TC-V1 |
  | EC11 | ❌ Invalid | failedAttempts ≥ 3 (khóa) | TC-I6 |
  | EC12 | ✅ Valid | Tài khoản không bị khóa | TC-V1 |
  | EC13 | ✅ Valid | Hết hạn khóa → mở lại | TC-V2 |
  | EC14 | ❌ Invalid | Đang bị khóa | TC-I7 |
  | EC15 | ✅ Valid | Bộ đếm +1 khi sai | TC-I5, TC-I6 *(output assert)* |
  | EC16 | ❌ Invalid | Bộ đếm không +1 | TC-I5, TC-I6 *(negative check)* |
  | EC17 | ✅ Valid | Bộ đếm reset khi thành công | TC-V2 |
  | EC18 | ❌ Invalid | Bộ đếm không reset | TC-V2 *(negative check)* |
  | EC19 | ✅ Valid | Thông báo lỗi chung chung | TC-I3, TC-I5, TC-I7 *(output assert)* |
  | EC20 | ❌ Invalid | Thông báo lộ chi tiết | TC-I3, TC-I5 *(negative check)* |
  | EC21 | ✅ Valid | Lỗi hiển thị trên nút submit | TC-I1→I5 *(output assert)* |
  | EC22 | ❌ Invalid | Lỗi hiển thị dưới nút submit | TC-I1→I5 *(negative check)* |

  ### D. Tổng kết

  | Loại | Số lượng TC | ECs bao phủ |
  |---|---|---|
  | Valid Test Cases | 2 | 10/10 Valid ECs ✅ |
  | Invalid Test Cases | 7 | 12/12 Invalid ECs ✅ |
  | **Tổng** | **9** | **22/22 (100%)** |

---

## Log Entry #6

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-06-25 13:44:08 (GMT+7)
- **Prompt:**
  > Nếu đăng nhập sai bị khóa 30 giây, sau hết thời gian khóa đó đăng nhập sai tiếp thì như thế nào, có yêu cầu không, có phân hoạch và test case chưa
- **Output:**

  ### Phân tích: Đăng nhập sai sau khi hết hạn khóa

  #### Đặc tả nói gì?

  Từ README.md:
  > *"Sau mỗi lần đăng nhập sai, hệ thống tăng bộ đếm lên **đúng 1 đơn vị**"*
  > *"Nếu đăng nhập sai từ **3 lần trở lên liên tiếp**, tài khoản bị tạm khóa **30 giây**"*

  **Từ khóa quan trọng:** "liên tiếp" — Đặc tả chỉ nói thành công (success) phá chuỗi liên tiếp. **Hết hạn khóa ≠ thành công**, nên:

  | Câu hỏi | Phân tích |
  |---|---|
  | Hết hạn khóa có reset bộ đếm không? | Đặc tả **không nói rõ** → Đây là **spec ambiguity** |
  | Nếu **không reset**: failedAttempts vẫn ≥ 3 → sai tiếp → **re-lock ngay lập tức** | Khả năng cao (vì "liên tiếp" chỉ bị phá bởi thành công) |
  | Nếu **có reset**: failedAttempts = 0 → sai tiếp → failedAttempts = 1 → chưa khóa | Cũng hợp lý (nhiều hệ thống làm vậy) |

  #### Kết luận: THIẾU — cần bổ sung cả EC lẫn TC

  **Hiện tại TC-V2 chỉ test:** Hết khóa + đăng nhập **đúng** → thành công ✅
  **Chưa test:** Hết khóa + đăng nhập **sai** → chuyện gì xảy ra? ❌

  #### Bổ sung Equivalence Class

  Áp dụng **quy tắc chia nhỏ**: EC13 cần split vì hành vi khác nhau tùy password đúng/sai sau khi hết khóa:

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC13 *(giữ nguyên)* | ✅ Valid | Hết hạn khóa + đăng nhập **đúng** → thành công | Chia nhỏ EC13 gốc |
  | **EC23** *(mới)* | ❌ Invalid | Hết hạn khóa + đăng nhập **sai** → hệ thống phải xử lý đúng (re-lock ngay hoặc bắt đầu đếm lại?) | Chia nhỏ — hành vi khác biệt |

  #### Bổ sung Test Case

  | TC ID | Mô tả | Precondition | Email | Password | Invalid EC | Expected Output | Ghi chú |
  |---|---|---|---|---|---|---|---|
  | **TC-I8** | Đăng nhập sai sau khi hết hạn khóa | failedAttempts ≥ 3, lock đã hết hạn (30s+) | `test@eshop.com` | `SaiMK@123` | **EC23** | ⚠️ **Spec ambiguity** — Cần kiểm tra thực tế: (1) Re-lock ngay nếu counter chưa reset, hoặc (2) failedAttempts = 1 nếu counter đã reset | Ghi nhận kết quả thực tế cho AI Gap Analysis |

  #### Bảng tổng hợp cập nhật

  | Loại | Số lượng TC | ECs bao phủ |
  |---|---|---|
  | Valid Test Cases | 2 | 10/10 Valid ECs ✅ |
  | Invalid Test Cases | **8** *(+1)* | **13/13** Invalid ECs ✅ |
  | **Tổng** | **10** | **23/23 (100%)** |

---

## Log Entry #7

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-06-28 09:16:02 (GMT+7)
- **Prompt:**
  > Oke tôi đã kiểm tra và đã ổn, tiếp tục bước 4: Phân tích Giá trị Biên (BVA)
- **Output:**

  ## FR-02: Đăng nhập & Khóa tài khoản — Bước 4: Boundary Value Analysis (BVA)

  ### 1. Xác định các trường có thứ tự (Ordered Fields)

  | Biến | Kiểu | Có thứ tự? | Lý do |
  |---|---|---|---|
  | V1 — Email | String | ❌ Không | Dạng format, không có khoảng số học |
  | V2 — Password | String | ❌ Không | Không có ràng buộc độ dài khi login |
  | **S3 — failedAttempts** | Integer | ✅ **Có** | Ngưỡng khóa tại 3 → ranh giới rõ ràng giữa 2 và 3 |
  | **S5 — Thời gian khóa** | Integer (giây) | ✅ **Có** | Lock duration = 30s → ranh giới tại 29/30/31 giây |

  → **2 trường cần BVA: S3 (failedAttempts) và S5 (lock duration)**

  ### 2. BVA cho S3: Bộ đếm đăng nhập sai liên tiếp (failedAttempts)

  **Phân hoạch:**
  - Valid: 0 ≤ failedAttempts ≤ 2 (cho phép đăng nhập)
  - Invalid: failedAttempts ≥ 3 (kích hoạt khóa)

  **Ranh giới:** giữa 2 (UB valid) và 3 (LB invalid)

  | # | Điểm biên | Giá trị | Phân hoạch | Kịch bản test | TC ánh xạ |
  |---|---|---|---|---|---|
  | BV1 | LB valid | failedAttempts = 0 | ✅ Valid | Lần sai đầu tiên, counter 0→1, chưa khóa | TC-I5 *(đã có)* |
  | BV2 | LB + 1 | failedAttempts = 1 | ✅ Valid | Lần sai thứ 2, counter 1→2, chưa khóa | **TC-BVA1** *(MỚI)* |
  | BV3 | **UB valid** | **failedAttempts = 2** | ✅ Valid (biên) | **Lần sai cuối trước khóa**, counter 2→3 → **KHÓA** | TC-I6 *(đã có)* |
  | BV4 | **LB invalid** | **failedAttempts = 3** | ❌ Invalid (biên) | Tài khoản vừa bị khóa, thử đăng nhập → từ chối | TC-I7 *(đã có)* |
  | BV5 | LB invalid + 1 | failedAttempts = 4 | ❌ Invalid | Sai lần thứ 4 (sau re-attempt), vẫn bị khóa | **TC-BVA2** *(MỚI)* |

  > **Ghi chú:** LB - 1 = -1 → không khả thi (counter không thể âm), bỏ qua.

  **Bổ sung test case:**

  | TC ID | Mô tả | Precondition | Input | Expected | Biên kiểm tra |
  |---|---|---|---|---|---|
  | **TC-BVA1** | Sai lần thứ 2 (failedAttempts = 1 → 2) | failedAttempts = 1, không khóa | Email đúng, password sai | Lỗi, counter = 2, **chưa khóa** | BV2: LB+1 |
  | **TC-BVA2** | Sai lần thứ 4+ (failedAttempts ≥ 4) | failedAttempts = 3, đang bị khóa, chưa hết 30s | Email đúng, password sai | Từ chối, vẫn khóa, counter tăng (hoặc giữ) | BV5: LB invalid+1 |

  ### 3. BVA cho S5: Thời gian khóa (Lock Duration = 30 giây)

  **Phân hoạch:**
  - Locked: 0 < elapsed < 30 giây (tài khoản bị khóa)
  - Unlocked: elapsed ≥ 30 giây (hết khóa)

  **Ranh giới:** tại 30 giây

  | # | Điểm biên | Giá trị | Phân hoạch | Kịch bản test | TC ánh xạ |
  |---|---|---|---|---|---|
  | BV6 | **UB - 1** | **elapsed = 29s** | ❌ Locked | Đăng nhập tại 29s sau khi khóa → **vẫn bị khóa** | **TC-BVA3** *(MỚI)* |
  | BV7 | **UB (biên)** | **elapsed = 30s** | ⚠️ Boundary | Đăng nhập tại **đúng 30s** → hệ thống nên mở khóa | **TC-BVA4** *(MỚI)* |
  | BV8 | **UB + 1** | **elapsed = 31s** | ✅ Unlocked | Đăng nhập tại 31s → **đã mở khóa**, cho phép đăng nhập | **TC-BVA5** *(MỚI)* |

  **Bổ sung test case:**

  | TC ID | Mô tả | Precondition | Thời điểm thử | Input | Expected | Biên kiểm tra |
  |---|---|---|---|---|---|---|
  | **TC-BVA3** | Login tại 29s sau khóa | Tài khoản bị khóa | **29 giây** sau khóa | Email đúng, password đúng | ❌ Từ chối — vẫn trong thời gian khóa | BV6: UB-1 |
  | **TC-BVA4** | Login tại đúng 30s sau khóa | Tài khoản bị khóa | **Đúng 30 giây** sau khóa | Email đúng, password đúng | ⚠️ Biên — hệ thống nên mở khóa (cần verify thực tế) | BV7: UB |
  | **TC-BVA5** | Login tại 31s sau khóa | Tài khoản bị khóa | **31 giây** sau khóa | Email đúng, password đúng | ✅ Đăng nhập thành công — đã hết khóa | BV8: UB+1 |

  ### 4. Tổng hợp Test Cases sau BVA

  | Nhóm | Test Cases | Số lượng |
  |---|---|---|
  | Valid (Bước 3) | TC-V1, TC-V2 | 2 |
  | Invalid (Bước 3) | TC-I1 → TC-I8 | 8 |
  | **BVA (Bước 4)** | **TC-BVA1 → TC-BVA5** | **5** |
  | **Tổng** | | **15** |

  ### 5. Bảng tổng hợp toàn bộ Test Cases (Bước 3 + Bước 4)

  | TC ID | Mô tả | Loại | ECs / BVs |
  |---|---|---|---|
  | TC-V1 | Happy path — đăng nhập thành công | Valid | EC1,4,6,8,10,12 |
  | TC-V2 | Thành công sau hết khóa + reset counter | Valid | EC13, EC17 |
  | TC-I1 | Email rỗng | Invalid | EC2 |
  | TC-I2 | Email format sai | Invalid | EC3 |
  | TC-I3 | Email không tồn tại | Invalid | EC5 |
  | TC-I4 | Password rỗng | Invalid | EC7 |
  | TC-I5 | Password sai (lần 1) | Invalid | EC9, verify EC15,19,21 |
  | TC-I6 | Sai lần 3 → khóa | Invalid | EC11, verify EC15 |
  | TC-I7 | Login khi đang khóa (đúng creds) | Invalid | EC14 |
  | TC-I8 | Sai sau hết khóa | Invalid | EC23 |
  | **TC-BVA1** | Sai lần 2 (counter 1→2, chưa khóa) | BVA | BV2 |
  | **TC-BVA2** | Sai lần 4+ (vẫn khóa) | BVA | BV5 |
  | **TC-BVA3** | Login tại 29s → vẫn khóa | BVA | BV6 |
  | **TC-BVA4** | Login tại đúng 30s → biên | BVA | BV7 |
  | **TC-BVA5** | Login tại 31s → đã mở khóa | BVA | BV8 |

---

## Log Entry #8

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-06-28 09:29:54 (GMT+7)
- **Prompt:**
  > Cập nhật lại các test case ở bước 3 cho tôi, không được sửa log mà viết thành 1 log mới
- **Output:**

  ## FR-02: Bước 3 (Cập nhật) — Test Cases tối thiểu (bao gồm EC23 và TC-I8)

  ### A. Valid Test Cases (kết hợp nhiều Valid ECs)

  | TC ID | Mô tả | Precondition | Email | Password | ECs bao phủ | Expected Output |
  |---|---|---|---|---|---|---|
  | **TC-V1** | Đăng nhập thành công — Happy Path | failedAttempts = 0, tài khoản không bị khóa | `test@eshop.com` | `Test1234!` | EC1, EC4, EC6, EC8, EC10, EC12 | ✅ JWT Token trả về, chuyển hướng thành công |
  | **TC-V2** | Đăng nhập thành công sau hết hạn khóa + Bộ đếm reset | failedAttempts ≥ 3, tài khoản đã bị khóa nhưng **đã qua 30s** | `test@eshop.com` | `Test1234!` | EC13, EC17 | ✅ JWT Token trả về, failedAttempts reset về 0 |

  ### B. Invalid Test Cases (1 Invalid EC mỗi test case)

  | TC ID | Mô tả | Precondition | Email | Password | Invalid EC | Expected Output | Output ECs verified |
  |---|---|---|---|---|---|---|---|
  | **TC-I1** | Email rỗng | — | *(rỗng)* | `Test1234!` | **EC2** | Lỗi validation (HTML5 hoặc form) | EC21 |
  | **TC-I2** | Email format sai | — | `invalid-email` | `Test1234!` | **EC3** | Lỗi validation format email | EC21 |
  | **TC-I3** | Email không tồn tại trong DB | failedAttempts = 0, không khóa | `nobody@test.com` | `Test1234!` | **EC5** | Lỗi chung chung (không lộ "email không tồn tại") | EC19, EC21 |
  | **TC-I4** | Password rỗng | — | `test@eshop.com` | *(rỗng)* | **EC7** | Lỗi validation (field required) | EC21 |
  | **TC-I5** | Password sai (lần đầu) | failedAttempts = 0, không khóa | `test@eshop.com` | `SaiMK@123` | **EC9** | Lỗi chung chung, failedAttempts tăng từ 0 → 1 | EC15, EC19, EC21 |
  | **TC-I6** | Sai lần thứ 3 → Kích hoạt khóa | failedAttempts = 2 (đã sai 2 lần trước) | `test@eshop.com` | `SaiMK@123` | **EC11** | Tài khoản bị khóa 30s, thông báo lỗi phù hợp, failedAttempts = 3 | EC15 |
  | **TC-I7** | Đăng nhập khi đang bị khóa (credentials đúng) | failedAttempts ≥ 3, tài khoản **đang bị khóa** (chưa hết 30s) | `test@eshop.com` | `Test1234!` | **EC14** | ❌ Từ chối dù đúng email + password, thông báo lỗi | EC19 |
  | **TC-I8** | Đăng nhập sai sau khi hết hạn khóa | failedAttempts ≥ 3, lock đã hết hạn (30s+) | `test@eshop.com` | `SaiMK@123` | **EC23** | ⚠️ **Spec ambiguity** — Cần kiểm tra thực tế: (1) Re-lock ngay nếu counter chưa reset, hoặc (2) failedAttempts = 1 nếu counter đã reset | Ghi nhận kết quả thực tế cho AI Gap Analysis |

  ### C. Ma trận bao phủ EC ↔ Test Case

  | EC ID | Loại | Mô tả | Bao phủ bởi TC |
  |---|---|---|---|
  | EC1 | ✅ Valid | Email format hợp lệ | TC-V1 |
  | EC2 | ❌ Invalid | Email rỗng | TC-I1 |
  | EC3 | ❌ Invalid | Email format sai | TC-I2 |
  | EC4 | ✅ Valid | Email tồn tại trong DB | TC-V1 |
  | EC5 | ❌ Invalid | Email không tồn tại | TC-I3 |
  | EC6 | ✅ Valid | Password không rỗng | TC-V1 |
  | EC7 | ❌ Invalid | Password rỗng | TC-I4 |
  | EC8 | ✅ Valid | Password khớp | TC-V1 |
  | EC9 | ❌ Invalid | Password sai | TC-I5 |
  | EC10 | ✅ Valid | failedAttempts < 3 | TC-V1 |
  | EC11 | ❌ Invalid | failedAttempts ≥ 3 (khóa) | TC-I6 |
  | EC12 | ✅ Valid | Tài khoản không bị khóa | TC-V1 |
  | EC13 | ✅ Valid | Hết hạn khóa → mở lại | TC-V2 |
  | EC14 | ❌ Invalid | Đang bị khóa | TC-I7 |
  | EC15 | ✅ Valid | Bộ đếm +1 khi sai | TC-I5, TC-I6 *(output assert)* |
  | EC16 | ❌ Invalid | Bộ đếm không +1 | TC-I5, TC-I6 *(negative check)* |
  | EC17 | ✅ Valid | Bộ đếm reset khi thành công | TC-V2 |
  | EC18 | ❌ Invalid | Bộ đếm không reset | TC-V2 *(negative check)* |
  | EC19 | ✅ Valid | Thông báo lỗi chung chung | TC-I3, TC-I5, TC-I7 *(output assert)* |
  | EC20 | ❌ Invalid | Thông báo lộ chi tiết | TC-I3, TC-I5 *(negative check)* |
  | EC21 | ✅ Valid | Lỗi hiển thị trên nút submit | TC-I1→I5 *(output assert)* |
  | EC22 | ❌ Invalid | Lỗi hiển thị dưới nút submit | TC-I1→I5 *(negative check)* |
  | EC23 | ❌ Invalid | Tiếp tục đăng nhập sai sau khi mở khóa | TC-I8 |

  ### D. Tổng kết

  | Loại | Số lượng TC | ECs bao phủ |
  |---|---|---|
  | Valid Test Cases | 2 | 10/10 Valid ECs ✅ |
  | Invalid Test Cases | **8** | **13/13** Invalid ECs ✅ |
  | **Tổng** | **10** | **23/23 (100%)** |

---

## Log Entry #9

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-06-28 09:38:35 (GMT+7)
- **Prompt:**
  > Mấy cái test case như TC-BVA1, TC-BVA2 đã thêm ở bước trước đâu, ghi log mới
- **Output:**

  ## FR-02: Tổng hợp toàn bộ Test Cases (Bước 3 + Bước 4)

  ### A. Valid Test Cases (kết hợp nhiều Valid ECs)

  | TC ID | Mô tả | Precondition | Email | Password | ECs bao phủ | Expected Output |
  |---|---|---|---|---|---|---|
  | **TC-V1** | Đăng nhập thành công — Happy Path | failedAttempts = 0, tài khoản không bị khóa | `test@eshop.com` | `Test1234!` | EC1, EC4, EC6, EC8, EC10, EC12 | ✅ JWT Token trả về, chuyển hướng thành công |
  | **TC-V2** | Đăng nhập thành công sau hết hạn khóa + Bộ đếm reset | failedAttempts ≥ 3, tài khoản đã bị khóa nhưng **đã qua 30s** | `test@eshop.com` | `Test1234!` | EC13, EC17 | ✅ JWT Token trả về, failedAttempts reset về 0 |

  ### B. Invalid Test Cases (1 Invalid EC mỗi test case)

  | TC ID | Mô tả | Precondition | Email | Password | Invalid EC | Expected Output | Output ECs verified |
  |---|---|---|---|---|---|---|---|
  | **TC-I1** | Email rỗng | — | *(rỗng)* | `Test1234!` | **EC2** | Lỗi validation (HTML5 hoặc form) | EC21 |
  | **TC-I2** | Email format sai | — | `invalid-email` | `Test1234!` | **EC3** | Lỗi validation format email | EC21 |
  | **TC-I3** | Email không tồn tại trong DB | failedAttempts = 0, không khóa | `nobody@test.com` | `Test1234!` | **EC5** | Lỗi chung chung (không lộ "email không tồn tại") | EC19, EC21 |
  | **TC-I4** | Password rỗng | — | `test@eshop.com` | *(rỗng)* | **EC7** | Lỗi validation (field required) | EC21 |
  | **TC-I5** | Password sai (lần đầu) | failedAttempts = 0, không khóa | `test@eshop.com` | `SaiMK@123` | **EC9** | Lỗi chung chung, failedAttempts tăng từ 0 → 1 | EC15, EC19, EC21 |
  | **TC-I6** | Sai lần thứ 3 → Kích hoạt khóa | failedAttempts = 2 (đã sai 2 lần trước) | `test@eshop.com` | `SaiMK@123` | **EC11** | Tài khoản bị khóa 30s, thông báo lỗi phù hợp, failedAttempts = 3 | EC15 |
  | **TC-I7** | Đăng nhập khi đang bị khóa (credentials đúng) | failedAttempts ≥ 3, tài khoản **đang bị khóa** (chưa hết 30s) | `test@eshop.com` | `Test1234!` | **EC14** | ❌ Từ chối dù đúng email + password, thông báo lỗi | EC19 |
  | **TC-I8** | Đăng nhập sai sau khi hết hạn khóa | failedAttempts ≥ 3, lock đã hết hạn (30s+) | `test@eshop.com` | `SaiMK@123` | **EC23** | ⚠️ **Spec ambiguity** — Cần kiểm tra thực tế: (1) Re-lock ngay nếu counter chưa reset, hoặc (2) failedAttempts = 1 nếu counter đã reset | Ghi nhận kết quả thực tế cho AI Gap Analysis |

  ### C. BVA Test Cases (Bước 4)

  | TC ID | Mô tả | Precondition | Thời điểm / Input | Expected Output | Biên kiểm tra |
  |---|---|---|---|---|---|
  | **TC-BVA1** | Sai lần thứ 2 (counter 1→2, chưa khóa) | failedAttempts = 1, không khóa | Email đúng, password sai | Lỗi, counter = 2, **chưa khóa** | BV2: LB+1 (failedAttempts) |
  | **TC-BVA2** | Sai lần thứ 4+ (vẫn khóa) | failedAttempts = 3, đang bị khóa, chưa hết 30s | Email đúng, password sai | Từ chối, vẫn khóa | BV5: LB invalid+1 (failedAttempts) |
  | **TC-BVA3** | Login tại 29s sau khóa → vẫn khóa | Tài khoản bị khóa | **29 giây** sau khóa, email đúng, password đúng | ❌ Từ chối — vẫn trong thời gian khóa | BV6: UB-1 (lock duration) |
  | **TC-BVA4** | Login tại đúng 30s sau khóa → biên | Tài khoản bị khóa | **Đúng 30 giây** sau khóa, email đúng, password đúng | ⚠️ Biên — hệ thống nên mở khóa (cần verify thực tế) | BV7: UB (lock duration) |
  | **TC-BVA5** | Login tại 31s sau khóa → đã mở khóa | Tài khoản bị khóa | **31 giây** sau khóa, email đúng, password đúng | ✅ Đăng nhập thành công — đã hết khóa | BV8: UB+1 (lock duration) |

  ### D. Ma trận bao phủ EC ↔ Test Case (hoàn chỉnh)

  | EC ID | Loại | Mô tả | Bao phủ bởi TC |
  |---|---|---|---|
  | EC1 | ✅ Valid | Email format hợp lệ | TC-V1 |
  | EC2 | ❌ Invalid | Email rỗng | TC-I1 |
  | EC3 | ❌ Invalid | Email format sai | TC-I2 |
  | EC4 | ✅ Valid | Email tồn tại trong DB | TC-V1 |
  | EC5 | ❌ Invalid | Email không tồn tại | TC-I3 |
  | EC6 | ✅ Valid | Password không rỗng | TC-V1 |
  | EC7 | ❌ Invalid | Password rỗng | TC-I4 |
  | EC8 | ✅ Valid | Password khớp | TC-V1 |
  | EC9 | ❌ Invalid | Password sai | TC-I5 |
  | EC10 | ✅ Valid | failedAttempts < 3 | TC-V1 |
  | EC11 | ❌ Invalid | failedAttempts ≥ 3 (khóa) | TC-I6 |
  | EC12 | ✅ Valid | Tài khoản không bị khóa | TC-V1 |
  | EC13 | ✅ Valid | Hết hạn khóa → mở lại | TC-V2 |
  | EC14 | ❌ Invalid | Đang bị khóa | TC-I7 |
  | EC15 | ✅ Valid | Bộ đếm +1 khi sai | TC-I5, TC-I6, TC-BVA1 |
  | EC16 | ❌ Invalid | Bộ đếm không +1 | TC-I5, TC-I6, TC-BVA1 *(negative check)* |
  | EC17 | ✅ Valid | Bộ đếm reset khi thành công | TC-V2 |
  | EC18 | ❌ Invalid | Bộ đếm không reset | TC-V2 *(negative check)* |
  | EC19 | ✅ Valid | Thông báo lỗi chung chung | TC-I3, TC-I5, TC-I7 |
  | EC20 | ❌ Invalid | Thông báo lộ chi tiết | TC-I3, TC-I5 *(negative check)* |
  | EC21 | ✅ Valid | Lỗi hiển thị trên nút submit | TC-I1→I5 |
  | EC22 | ❌ Invalid | Lỗi hiển thị dưới nút submit | TC-I1→I5 *(negative check)* |
  | EC23 | ❌ Invalid | Tiếp tục đăng nhập sai sau khi mở khóa | TC-I8 |

  ### E. Tổng kết hoàn chỉnh FR-02

  | Nhóm | Test Cases | Số lượng |
  |---|---|---|
  | Valid (Bước 3) | TC-V1, TC-V2 | 2 |
  | Invalid (Bước 3) | TC-I1 → TC-I8 | 8 |
  | BVA (Bước 4) | TC-BVA1 → TC-BVA5 | 5 |
  | **Tổng FR-02** | | **15 test cases** |
  | **ECs coverage** | | **23/23 (100%)** |
  | **BVs coverage** | | **8/8 (100%)** |

---

## Log Entry #10

- **Công cụ AI:** Gemini - Antigravity IDE (Gemini 3.1 Pro (High))
- **Ngày giờ:** 2026-06-28 17:55:02 (GMT+7)
- **Prompt:**
  > bây giờ bắt đầu làm bước 01 cho chức năng FR-08 Checkout cho tôi, làm đúng theo yêu cầu, không làm gì dư thừa. Tự động ghi log cho tôi
- **Output:**

  ## FR-08: Thanh toán (Checkout) — Bước 1: Input Variables & Domains

  Dựa trên đặc tả FR-08 trong `README.md`, tiến hành xác định các biến như sau:

  ### A. Biến đầu vào trực tiếp (UI Input & Client Payload Variables)

  | # | Biến | Kiểu | Miền giá trị (Domain) | Nguồn đặc tả |
  |---|---|---|---|---|
  | V1 | **Thao tác chỉnh sửa tổng tiền trên UI** | UI Action | {Không thể chỉnh sửa (Read-only), Có thể chỉnh sửa} | FR-08: "không cho phép người dùng chỉnh sửa trực tiếp" |
  | V2 | **`total_amount` (Gửi lên từ API Client)** | Float/Int | {Bằng tổng tiền Backend tính, Khác tổng tiền Backend tính} | FR-08: "không chấp nhận giá trị total_amount do client gửi lên" |

  ### B. Biến trạng thái hệ thống (System State / Database Variables)

  | # | Biến | Kiểu | Miền giá trị (Domain) | Nguồn đặc tả |
  |---|---|---|---|---|
  | S1 | **Trạng thái đăng nhập (JWT Token)** | Boolean | {Đã đăng nhập (Token hợp lệ), Chưa đăng nhập (Không có / Token sai)} | FR-08: "Chỉ người dùng đã đăng nhập mới tiến hành thanh toán được" |
  | S2 | **Trạng thái Giỏ hàng (Cart State)** | Enum | {Có sản phẩm, Trống} | FR-08: (Ngầm định để có dữ liệu thanh toán) |

  ### C. Biến đầu ra (Output Variables)

  | # | Biến | Kiểu | Miền giá trị (Domain) | Nguồn đặc tả |
  |---|---|---|---|---|
  | O1 | **Kết quả tạo đơn thanh toán** | Enum | {Thành công tạo đơn, Bị từ chối trả về lỗi} | FR-08 |
  | O2 | **Tổng tiền hóa đơn thực tế** | Float/Int | {Bằng giá trị Backend tự tính từ giỏ hàng} | FR-08: "Backend phải tự tính lại tổng tiền" |
  | O3 | **Trạng thái Giỏ hàng sau thanh toán** | Enum | {Được xóa rỗng, Giữ nguyên} | FR-08: "Sau thanh toán thành công, giỏ hàng được xóa" |
  | O4 | **Giao diện hiển thị Checkout** | UI View | {Hiển thị đầy đủ danh sách sản phẩm đặt mua, Thiếu/Không hiển thị} | FR-08: "Giao diện hiển thị đầy đủ danh sách sản phẩm đặt mua" |

---

## Log Entry #11

- **Công cụ AI:** Gemini - Antigravity IDE (Gemini 3.1 Pro (High))
- **Ngày giờ:** 2026-06-28 17:59:17 (GMT+7)
- **Prompt:**
  > Oke đã ổn, chuyển sang bước 2 - phân hoạch tương đương
- **Output:**

  ## FR-08: Thanh toán (Checkout) — Bước 2: Equivalence Classes

  ### Biến V1: Thao tác chỉnh sửa tổng tiền trên UI
  **Nguyên tắc áp dụng:** "Must be" (Người dùng không được phép chỉnh sửa).
  
  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC1 | ✅ Valid | Tổng tiền hiển thị dạng Read-only (không thể can thiệp qua form) | Must be — thỏa mãn |
  | EC2 | ❌ Invalid | Tổng tiền có thể chỉnh sửa trực tiếp trên giao diện | Must be — không thỏa mãn |

  ### Biến V2: `total_amount` (Gửi lên từ API Client)
  **Nguyên tắc áp dụng:** "Must be" (Không chấp nhận giá trị do client gửi lên).
  
  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC3 | ✅ Valid | Client gửi `total_amount` đúng bằng với giỏ hàng (hoặc không gửi, để tự tính) | Must be — thỏa mãn |
  | EC4 | ❌ Invalid | Client cố tình gửi `total_amount` sai lệch (VD: sửa thành 1đ) nhằm gian lận | Must be — không thỏa mãn (Test bảo mật) |

  ### Biến S1: Trạng thái đăng nhập (JWT Token)
  **Nguyên tắc áp dụng:** "Must be" (Phải đăng nhập mới được thanh toán).
  
  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC5 | ✅ Valid | Request có chứa JWT Token hợp lệ | Must be — thỏa mãn |
  | EC6 | ❌ Invalid | Request không chứa Token hoặc Token hết hạn/sai | Must be — không thỏa mãn |

  ### Biến S2: Trạng thái Giỏ hàng (Cart State)
  **Nguyên tắc áp dụng:** "Must be" (Phải có sản phẩm mới được thanh toán).
  
  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC7 | ✅ Valid | Giỏ hàng đang chứa ít nhất 1 sản phẩm | Must be — thỏa mãn |
  | EC8 | ❌ Invalid | Giỏ hàng trống | Must be — không thỏa mãn |

  ### Biến Output O2: Tổng tiền hóa đơn thực tế
  **Nguyên tắc áp dụng:** "Must be" (Backend tự tính).
  
  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC9 | ✅ Valid | Đơn hàng tạo ra ghi nhận tổng tiền ĐÚNG bằng giá trị Backend tự tính | Must be — thỏa mãn |
  | EC10 | ❌ Invalid | Đơn hàng tạo ra lưu sai tổng tiền (VD: lấy theo giá trị client gửi lên ở EC4) | Must be — không thỏa mãn |

  ### Biến Output O3: Trạng thái Giỏ hàng sau thanh toán
  **Nguyên tắc áp dụng:** "Must be" (Thành công thì xóa) + Chia nhỏ (Thất bại thì giữ nguyên).
  
  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC11 | ✅ Valid | Giỏ hàng được xóa rỗng ngay sau khi tạo đơn **thành công** | Must be — thỏa mãn |
  | EC12 | ❌ Invalid | Giỏ hàng vẫn còn nguyên dù đã tạo đơn **thành công** | Must be — không thỏa mãn |
  | EC13 | ✅ Valid | Giỏ hàng được giữ nguyên khi yêu cầu thanh toán **bị từ chối/thất bại** | Chia nhỏ hành vi — thỏa mãn |
  | EC14 | ❌ Invalid | Giỏ hàng bị xóa mất dù yêu cầu thanh toán **thất bại** | Chia nhỏ hành vi — không thỏa mãn |

  ### Biến Output O4: Giao diện hiển thị Checkout
  **Nguyên tắc áp dụng:** "Must be" (Hiển thị đầy đủ).
  
  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC15 | ✅ Valid | UI hiển thị đầy đủ danh sách sản phẩm đặt mua | Must be — thỏa mãn |
  | EC16 | ❌ Invalid | UI thiếu/không hiển thị danh sách sản phẩm đặt mua | Must be — không thỏa mãn |

  ### Bảng tổng hợp
  
  | Nhóm | Valid ECs | Invalid ECs | Tổng |
  |---|---|---|---|
  | V1 — Chỉnh sửa UI | EC1 | EC2 | 2 |
  | V2 — Payload `total_amount` | EC3 | EC4 | 2 |
  | S1 — Trạng thái đăng nhập | EC5 | EC6 | 2 |
  | S2 — Trạng thái giỏ hàng | EC7 | EC8 | 2 |
  | O2 — Tổng tiền thực tế | EC9 | EC10 | 2 |
  | O3 — Trạng thái giỏ hàng sau | EC11, EC13 | EC12, EC14 | 4 |
  | O4 — Hiển thị UI | EC15 | EC16 | 2 |
  | **Tổng** | **8 Valid** | **8 Invalid** | **16 ECs** |

---

## Log Entry #12

- **Công cụ AI:** Gemini - Antigravity IDE (Gemini 3.1 Pro (High))
- **Ngày giờ:** 2026-06-28 18:19:18 (GMT+7)
- **Prompt:**
  > O1 không cần Equivalence class à
- **Output:**

Bạn hoàn toàn chính xác! Rất cảm ơn bạn đã nhắc nhở, đúng là tôi đã sơ suất bỏ quên việc tạo EC riêng cho biến đầu ra quan trọng nhất là O1 (Kết quả tạo đơn thanh toán). Bài học từ Log Entry #4 của chức năng trước quả thực cần được áp dụng triệt để hơn cho các biến Output.

Tôi đã bổ sung phân hoạch cho O1 gồm:

- EC17 (✅ Valid): Hệ thống chấp nhận thanh toán, tạo đơn hàng thành công.
- EC18 (❌ Invalid): Hệ thống từ chối thanh toán, trả về thông báo lỗi và không tạo đơn.
Qua đó, bảng tổng hợp của chúng ta đã được nâng lên thành 18 ECs (9 Valid và 9 Invalid).

Tôi đã tạo ngay Log Entry #12 để ghi nhận nguyên văn góp ý của bạn và lưu trữ toàn bộ bản cập nhật hoàn chỉnh này vào file Log.md.

Mọi thứ đã ổn thỏa, bạn có muốn bắt tay vào Bước 3: Lựa chọn tập Test Cases tối thiểu ngay bây giờ không?

---

## Log Entry #13

- **Công cụ AI:** Gemini - Antigravity IDE (Gemini 3.1 Pro (High))
- **Ngày giờ:** 2026-06-28 18:27:59 (GMT+7)
- **Prompt:**
  > tôi đã kiểm tra bước 02 và thấy ổn, tiếp tục với bước 3 - selecting test cases
- **Output:**

  ## FR-08: Thanh toán (Checkout) — Bước 3: Lựa chọn tập Test Cases tối thiểu

  Dựa trên 18 Phân hoạch tương đương (ECs) đã xác định ở Bước 2, tôi thiết kế tập Test Cases tối ưu như sau:

  ### A. Valid Test Cases (Kết hợp tối đa các Valid ECs)

  | TC ID | Mô tả | Precondition (S1, S2) | Input (V1, V2) | Expected Output | Valid ECs bao phủ |
  |---|---|---|---|---|---|
  | **TC-V1** | Thanh toán thành công (Happy Path) | S1: Đã đăng nhập, S2: Giỏ hàng có sản phẩm | V1: Form Read-only, V2: Gửi API payload đúng tổng tiền | UI hiển thị đầy đủ SP. Backend tạo đơn thành công, lưu ĐÚNG tổng tiền tự tính. Giỏ hàng bị xóa rỗng sau đó. | EC1, EC3, EC5, EC7, EC9, EC11, EC15, EC17 |

  *(Ghi chú: EC13 - "Giỏ hàng giữ nguyên khi thất bại" là một Valid EC nhưng đối nghịch với Happy Path, nó sẽ được tích hợp kiểm chứng vào các kịch bản Invalid bên dưới).*

  ### B. Invalid Test Cases (Chỉ chứa duy nhất 1 Invalid EC mỗi TC)

  | TC ID | Mô tả | Precondition (S1, S2) | Input (V1, V2) | Invalid EC | Expected Output | Output ECs verified |
  |---|---|---|---|---|---|---|
  | **TC-I1** | Cố tình can thiệp UI tổng tiền | S1: Đã đăng nhập, S2: Có SP | V1: Dùng DevTools sửa DOM form tổng tiền, V2: Gửi payload đúng | **EC2** | UI/Frontend chặn không cho submit HOẶC bị backend ignore, xử lý như TC-V1. (Test tính chống chỉnh sửa UI) | EC17/18, EC13 |
  | **TC-I2** | Giả mạo payload API `total_amount` | S1: Đã đăng nhập, S2: Có SP | V1: Read-only, V2: **Sửa payload API (VD: gửi 1đ)** | **EC4** | Hệ thống tự động tính lại. Đơn được tạo với **giá thật** (không lấy 1đ) HOẶC API báo lỗi sai lệch tiền. | EC17/18, EC9, EC13 |
  | **TC-I3** | Thanh toán khi chưa đăng nhập | S1: **Chưa đăng nhập/Sai Token**, S2: Có SP | V1: Read-only, V2: Gửi đúng | **EC6** | API từ chối (401/403). Không tạo đơn, giỏ hàng giữ nguyên trạng thái. | EC18, EC13 |
  | **TC-I4** | Thanh toán khi giỏ hàng trống | S1: Đã đăng nhập, S2: **Giỏ hàng trống** | V1: Read-only, V2: Gửi đúng (0đ) | **EC8** | Giao diện chặn không cho ấn thanh toán / API từ chối. Không tạo đơn. | EC18, EC13 |

  ### C. Ma trận bao phủ EC - Test Case

  | EC ID | Loại | Mô tả | Bao phủ bởi TC |
  |---|---|---|---|
  | EC1 | ✅ Valid | UI tổng tiền Read-only | TC-V1 |
  | EC2 | ❌ Invalid | Có thể chỉnh sửa UI | TC-I1 |
  | EC3 | ✅ Valid | Payload `total_amount` khớp | TC-V1 |
  | EC4 | ❌ Invalid | Payload `total_amount` sai | TC-I2 |
  | EC5 | ✅ Valid | Đã đăng nhập (Có Token) | TC-V1 |
  | EC6 | ❌ Invalid | Chưa đăng nhập/Sai Token | TC-I3 |
  | EC7 | ✅ Valid | Giỏ hàng có SP | TC-V1 |
  | EC8 | ❌ Invalid | Giỏ hàng trống | TC-I4 |
  | EC17 | ✅ Valid | Tạo đơn thành công | TC-V1 |
  | EC18 | ❌ Invalid | Tạo đơn thất bại | TC-I3, TC-I4 |
  | EC9 | ✅ Valid | Lưu ĐÚNG tổng tiền backend | TC-V1, TC-I2 |
  | EC10 | ❌ Invalid | Lưu SAI tổng tiền | TC-V1, TC-I2 *(negative check)* |
  | EC11 | ✅ Valid | Thành công -> Xóa giỏ hàng | TC-V1 |
  | EC12 | ❌ Invalid | Thành công -> Không xóa | TC-V1 *(negative check)* |
  | EC13 | ✅ Valid | Thất bại -> Giữ nguyên giỏ hàng | TC-I1, TC-I2, TC-I3, TC-I4 |
  | EC14 | ❌ Invalid | Thất bại -> Xóa giỏ hàng | TC-I3, TC-I4 *(negative check)* |
  | EC15 | ✅ Valid | UI hiện đầy đủ SP | TC-V1 |
  | EC16 | ❌ Invalid | UI hiện thiếu/sai SP | TC-V1 *(negative check)* |

  ### D. Tổng kết
  - **Số lượng Test Cases:** 5 (1 Valid, 4 Invalid)
  - **Độ bao phủ ECs:** 18/18 (100%)

  Tôi đã thiết kế xong Bước 3 và đồng thời tạo **Log Entry #14** trong `Log.md` với nguyên văn nội dung câu trả lời này để tuân thủ tuyệt đối quy định Audit. Bạn kiểm tra giúp tôi xem các test case đã hợp lý chưa nhé!

---

## Log Entry #14

- **Công cụ AI:** Gemini - Antigravity IDE (Gemini 3.1 Pro (High))
- **Ngày giờ:** 2026-06-28 18:37:20 (GMT+7)
- **Prompt:**
  > Tốt, nhưng hiện tại mới là log entry 13 thôi. Tiếp tục chuyển sang bước 4 - Phân tích Giá trị Biên (Boundary Value Analysis - BVA)
- **Output:**

  ## FR-08: Thanh toán (Checkout) — Bước 4: Boundary Value Analysis (BVA)

  ### 1. Xác định các trường có thứ tự (Ordered Fields)
  Trong FR-08, đa số các biến là Categorical (như trạng thái đăng nhập, trạng thái UI). Tuy nhiên, chúng ta có thể áp dụng BVA cho 2 thuộc tính ngầm định sau:
  - **S2 (Số lượng sản phẩm trong giỏ hàng):** Integer. Ranh giới rõ ràng nhất là giữa giỏ hàng trống (0) và có sản phẩm (≥ 1).
  - **V2 (Payload `total_amount` gửi từ Client):** Float/Integer. Dù backend bỏ qua giá trị này, việc test các giá trị biên như số âm (-1) hoặc 0 là cực kỳ quan trọng để kiểm tra tính Robustness (chống crash/bug) của API.

  ### 2. BVA cho Số lượng sản phẩm trong giỏ hàng (Cart Items Count)
  **Phân hoạch:**
  - Invalid: count = 0 (Giỏ trống)
  - Valid: count ≥ 1 (Cho phép thanh toán)
  *(Đặc tả không giới hạn số lượng tối đa nên không có Upper Boundary)*

  | # | Điểm biên | Giá trị | Phân hoạch | Kịch bản test | TC ánh xạ |
  |---|---|---|---|---|---|
  | BV1 | **LB invalid (Biên)** | **count = 0** | ❌ Invalid | Checkout khi giỏ hàng có 0 sản phẩm | TC-I4 *(đã có)* |
  | BV2 | **LB valid (Biên)** | **count = 1** | ✅ Valid | Checkout khi giỏ hàng có đúng 1 sản phẩm | TC-V1 *(đã có)* |
  | BV3 | LB valid + 1 | count = 2 | ✅ Valid | Checkout khi giỏ hàng có 2 sản phẩm | **TC-BVA1** *(MỚI)* |

  ### 3. BVA cho `total_amount` payload API
  Với trường hợp giả mạo payload (EC4), ta áp dụng test tại các biên toán học để kiểm tra xem schema validation của backend có đủ chặt chẽ không.

  | # | Điểm biên | Giá trị | Phân hoạch | Kịch bản test | TC ánh xạ |
  |---|---|---|---|---|---|
  | BV4 | Trị số Âm | `-1` | ❌ Invalid (Payload) | Gửi payload `total_amount = -1` | **TC-BVA2** *(MỚI)* |
  | BV5 | Biên Không | `0` | ❌ Invalid (Payload) | Gửi payload `total_amount = 0` | **TC-BVA3** *(MỚI)* |
  | BV6 | Dương nhỏ nhất | `1` | ❌ Invalid (Payload) | Gửi payload `total_amount = 1` | TC-I2 *(đã có)* |

  ### 4. Tổng hợp Test Cases bổ sung (BVA)

  | TC ID | Mô tả | Precondition | Input / Thao tác | Expected Output | Biên kiểm tra |
  |---|---|---|---|---|---|
  | **TC-BVA1** | Thanh toán với 2 sản phẩm | Đã đăng nhập, Giỏ hàng có **2 sản phẩm** | Gửi payload bình thường | Đơn hàng tạo thành công với giá tổng của 2 sản phẩm | BV3 (Cart count) |
  | **TC-BVA2** | Giả mạo payload `total_amount` âm | Đã đăng nhập, Giỏ có SP | Gửi payload `total_amount = -1` | API chặn do validation sai kiểu dữ liệu HOẶC hệ thống tự động bỏ qua và tính lại giá thật | BV4 (Payload amount) |
  | **TC-BVA3** | Giả mạo payload `total_amount` = 0 | Đã đăng nhập, Giỏ có SP | Gửi payload `total_amount = 0` | Tương tự TC-BVA2 | BV5 (Payload amount) |

  ### 5. Bảng tổng hợp toàn bộ Test Cases FR-08 (Bước 3 + Bước 4)

  | TC ID | Mô tả | Loại | ECs / BVs |
  |---|---|---|---|
  | **TC-V1** | Thanh toán thành công (1 SP) | Valid | EC1,3,5,7,9,11,15,17 + **BV2** |
  | **TC-I1** | Cố tình can thiệp UI tổng tiền | Invalid | EC2, verify EC17/18,13 |
  | **TC-I2** | Giả mạo payload `total_amount = 1` | Invalid | EC4 + **BV6** |
  | **TC-I3** | Thanh toán khi chưa đăng nhập | Invalid | EC6, verify EC18,13 |
  | **TC-I4** | Thanh toán khi giỏ hàng trống (0 SP) | Invalid | EC8 + **BV1** |
  | **TC-BVA1** | Thanh toán với 2 sản phẩm | BVA | **BV3** |
  | **TC-BVA2** | Giả mạo payload `total_amount = -1` | BVA | **BV4** |
  | **TC-BVA3** | Giả mạo payload `total_amount = 0` | BVA | **BV5** |

  ### Tổng kết FR-08
  - **Tổng số lượng TC:** 8 Test Cases
  - **Độ bao phủ:** 18/18 ECs (100%), 6/6 BVs (100%)

  Tôi đã hoàn thành **Bước 4 (BVA)** và tổng hợp toàn bộ Test Case cho chức năng Checkout. Cùng với đó, tôi cũng đã tự động ghi lại **Log Entry #14** với chính xác toàn bộ nội dung của câu trả lời này vào `Log.md`. Bạn hãy kiểm tra lại nhé, nếu ổn thì chúng ta coi như đóng gói xong FR-08 và sẵn sàng chuyển sang tính năng khác!

---

## Log Entry #15

- **Công cụ AI:** Gemini - Antigravity IDE (Gemini 3.1 Pro (High))
- **Ngày giờ:** 2026-06-28 18:50:31 (GMT+7)
- **Prompt:**
  > tại sao lại cần BV3, test có 2 sản phẩm, chẳng phải các test case ở bước 3 đã test rồi sao
- **Output:**

  Chào bạn, câu hỏi của bạn rất sắc sảo! Đây là thắc mắc rất phổ biến khi chuyển từ Phân hoạch tương đương (Bước 3) sang Phân tích giá trị biên (Bước 4). 

  Lý do chúng ta bắt buộc phải có **BV3 (2 sản phẩm)** là vì:

  **1. Tuân thủ tiêu chuẩn kỹ thuật BVA (3-value boundary testing)**
  Khi có một ranh giới (ở đây là số lượng sản phẩm `count ≥ 1`), kỹ thuật BVA tiêu chuẩn yêu cầu kiểm thử 3 điểm sát biên nhất:
  - Điểm ngay ngoài biên (LB - 1): `count = 0` (Đã cover ở TC-I4)
  - Điểm ngay tại biên (LB): `count = 1` (Đã cover ở TC-V1)
  - Điểm ngay trong biên (LB + 1): `count = 2` (Chính là **BV3**)

  **2. Lý do thực tiễn (Bắt lỗi sai toán tử/Hardcode của Developer)**
  Mục đích cốt lõi của BVA là phát hiện các lỗi "Off-by-one" (lệch một đơn vị). Giả sử Developer code nhầm điều kiện kiểm tra giỏ hàng như sau:
  `if (cart.items.length == 1) { // Lỗi gõ nhầm == thay vì >=`
  hoặc
  `if (cart.items.length > 1) { // Lỗi gõ nhầm > thay vì >=`

  Nếu ở Bước 3, chúng ta chỉ test một đại diện ngẫu nhiên (chẳng hạn TC-V1 dùng đúng 1 sản phẩm), test case đó có thể **Pass**. Nhưng khi khách hàng mua 2 sản phẩm, hệ thống lại bị lỗi! 
  Việc bổ bổ sung TC-BVA1 với đúng **2 sản phẩm (LB + 1)** giúp chúng ta khẳng định chắc chắn rằng hệ thống đang dùng đúng toán tử `≥ 1`, chứ không phải là đang bị hardcode hay sai toán tử so sánh ở ngay điểm ranh giới.

  **Tóm lại:** Bước 3 (Equivalence Class) chỉ quan tâm "có lấy đại diện trong nhóm không". Còn Bước 4 (BVA) thì quét vi mô quanh cái ranh giới đó để chống sai sót logic. Đó là lý do BV3 ra đời như một test case bổ sung độc lập để làm chặt chẽ hơn bộ test.

  Tôi đã lưu lại câu hỏi tuyệt vời này và câu trả lời vào **Log Entry #15** trong `Log.md` rồi nhé. Bạn thấy lời giải thích này đã thỏa đáng chưa, và chúng ta có thể chốt lại FR-08 ở đây để chuyển sang chức năng tiếp theo được không?

---

## Log Entry #16

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-06-29 18:50:23 (GMT+7)
- **Prompt:**
  > chỉ làm liên quan đến FR-14, không làm gì dư thừa thêm. Tự động viết log. Bây giờ bắt tay vào làm bước 1 - Xác định input/output cho FR-14 Category management
- **Output:**

  ## FR-14: Quản lý Danh mục (Category CRUD) — Bước 1: Input Variables & Domains

  ### A. Biến đầu vào trực tiếp (UI Input Variables)

  | # | Biến | Kiểu | Miền giá trị (Domain) | Nguồn đặc tả |
  |---|---|---|---|---|
  | V1 | **Tên danh mục (Category Name)** | String | Chuỗi ký tự, bắt buộc, không được để trống | FR-14: "Tên danh mục là bắt buộc, không được để trống" |

  ### B. Biến trạng thái hệ thống (System State / Database Variables)

  | # | Biến | Kiểu | Miền giá trị (Domain) | Nguồn đặc tả |
  |---|---|---|---|---|
  | S1 | **Trạng thái xác thực (JWT Token)** | Boolean | {Token JWT hợp lệ, Token không hợp lệ / không có} | FR-12, SEC-02 |
  | S2 | **Vai trò người dùng (Role)** | Enum | {admin, non-admin (user thường)} | FR-12: "chỉ dành cho tài khoản có `role = 'admin'`", SEC-03 |
  | S3 | **Trạng thái tồn tại danh mục** (khi Xóa) | Boolean | {Danh mục tồn tại trong DB, Danh mục không tồn tại} | FR-14 (ngầm định — phải có danh mục mới xóa được) |

  ### C. Biến đầu ra (Output Variables)

  | # | Biến | Kiểu | Miền giá trị (Domain) | Nguồn đặc tả |
  |---|---|---|---|---|
  | O1 | **Kết quả thao tác** | Enum | {Thành công (Thêm/Xóa), Thất bại (trả lỗi)} | FR-14 |
  | O2 | **Danh sách danh mục hiển thị** | List / UI | {Hiển thị đầy đủ danh mục hiện có, Không hiển thị / thiếu} | FR-14: "Xem" |
  | O3 | **Thông báo lỗi** | String | {Thông báo phù hợp khi thất bại, Không hiển thị khi thành công} | FR-22 |
  | O4 | **Vị trí thông báo lỗi** | UI Position | {Trên nút submit, Dưới nút submit / vị trí khác} | FR-22: "Thông báo lỗi phải xuất hiện trên nút submit" |
  | O5 | **Ký hiệu trường bắt buộc** | UI Element | {Có dấu `*` bên cạnh nhãn, Không có dấu `*`} | FR-22: "Tất cả trường bắt buộc phải có ký hiệu `*`" |

---

## Log Entry #17

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-06-29 18:54:29 (GMT+7)
- **Prompt:**
  > tôi yêu cầu chỉ làm về FR-14, không được tham khảo bất kì các ràng buộc hay những gì ở các FR khác
- **Output:**

  ## FR-14: Quản lý Danh mục (Category CRUD) — Bước 1 (Làm lại): Input/Output Variables

  Đặc tả FR-14 nguyên văn:
  > - Admin có thể Thêm / Xem / Xóa danh mục.
  > - Tên danh mục là bắt buộc, không được để trống.

  ### A. Biến đầu vào trực tiếp (UI Input Variables)

  | # | Biến | Kiểu | Miền giá trị (Domain) | Nguồn đặc tả |
  |---|---|---|---|---|
  | V1 | **Tên danh mục (Category Name)** | String | Chuỗi ký tự, bắt buộc, không được để trống | FR-14: "Tên danh mục là bắt buộc, không được để trống" |

  ### B. Biến trạng thái hệ thống (System State)

  | # | Biến | Kiểu | Miền giá trị (Domain) | Nguồn đặc tả |
  |---|---|---|---|---|
  | S1 | **Vai trò người dùng** | Enum | {Admin, Non-admin} | FR-14: "**Admin** có thể Thêm / Xem / Xóa" |
  | S2 | **Trạng thái tồn tại danh mục** (khi Xóa) | Boolean | {Danh mục tồn tại trong DB, Danh mục không tồn tại} | FR-14 (ngầm định — phải có danh mục mới xóa được) |

  ### C. Biến đầu ra (Output Variables)

  | # | Biến | Kiểu | Miền giá trị (Domain) | Nguồn đặc tả |
  |---|---|---|---|---|
  | O1 | **Kết quả thao tác** | Enum | {Thành công, Thất bại} | FR-14 |
  | O2 | **Danh sách danh mục hiển thị** | List / UI | {Hiển thị đầy đủ danh mục hiện có, Không hiển thị / thiếu} | FR-14: "Xem" |

---

## Log Entry #18

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-06-29 19:04:36 (GMT+7)
- **Prompt:**
  > tôi đã kiểm tra và đã ổn, chuyển sang bước 2 - Equivalence Classes
- **Output:**

  ## FR-14: Quản lý Danh mục (Category CRUD) — Bước 2: Equivalence Classes

  ### Biến V1: Tên danh mục (Category Name) — Thao tác Thêm
  **Nguyên tắc áp dụng:** "Must be" (bắt buộc, không được để trống)

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC1 | ✅ Valid | Tên danh mục không rỗng (có nhập giá trị) | Must be — thỏa mãn |
  | EC2 | ❌ Invalid | Tên danh mục rỗng (không nhập gì) | Must be — không thỏa mãn |

  ### Biến S1: Vai trò người dùng
  **Nguyên tắc áp dụng:** "Must be" (phải là Admin mới thao tác được)

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC3 | ✅ Valid | Người dùng có vai trò Admin | Must be — thỏa mãn |
  | EC4 | ❌ Invalid | Người dùng không phải Admin (non-admin / user thường) | Must be — không thỏa mãn |

  ### Biến S2: Trạng thái tồn tại danh mục (khi Xóa)
  **Nguyên tắc áp dụng:** "Must be" (danh mục phải tồn tại để xóa được)

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC5 | ✅ Valid | Danh mục cần xóa tồn tại trong DB | Must be — thỏa mãn |
  | EC6 | ❌ Invalid | Danh mục cần xóa không tồn tại trong DB | Must be — không thỏa mãn |

  ### Bảng tổng hợp

  | Nhóm | Valid ECs | Invalid ECs | Tổng |
  |---|---|---|---|
  | V1 — Tên danh mục | EC1 | EC2 | 2 |
  | S1 — Vai trò người dùng | EC3 | EC4 | 2 |
  | S2 — Tồn tại danh mục (Xóa) | EC5 | EC6 | 2 |
  | **Tổng** | **3 Valid** | **3 Invalid** | **6 ECs** |

---

## Log Entry #19

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-06-29 19:09:46 (GMT+7)
- **Prompt:**
  > rà soát lại với các biến xem còn thiếu EC cho biến nào không
- **Output:**

  ### Rà soát các biến Output chưa có EC

  | Biến Output | Đã có EC? | Phân tích |
  |---|---|---|
  | **O1** — Kết quả thao tác (Thành công/Thất bại) | ❌ | Đây là **kết quả tổng hợp** từ các biến input/state. Không cần EC riêng — sẽ được verify qua test case ở Bước 3 |
  | **O2** — Danh sách danh mục hiển thị | ❌ ⚠️ | **Cần bổ sung!** "Xem" là thao tác tường minh trong FR-14. Cần kiểm tra danh sách có hiển thị đầy đủ hay không |

  ### Bổ sung — Biến O2: Danh sách danh mục hiển thị (Xem)

  **Nguyên tắc áp dụng:** "Must be" (phải hiển thị đầy đủ danh mục hiện có)

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC7 | ✅ Valid | Danh sách hiển thị đầy đủ tất cả danh mục hiện có trong DB | Must be — thỏa mãn |
  | EC8 | ❌ Invalid | Danh sách không hiển thị đầy đủ (thiếu hoặc không hiển thị) | Must be — không thỏa mãn |

  ### Bảng tổng hợp (cập nhật)

  | Nhóm | Valid ECs | Invalid ECs | Tổng |
  |---|---|---|---|
  | V1 — Tên danh mục | EC1 | EC2 | 2 |
  | S1 — Vai trò người dùng | EC3 | EC4 | 2 |
  | S2 — Tồn tại danh mục (Xóa) | EC5 | EC6 | 2 |
  | O2 — Danh sách hiển thị (Xem) | EC7 | EC8 | 2 |
  | **Tổng** | **4 Valid** | **4 Invalid** | **8 ECs** |

---

## Log Entry #20

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-06-29 19:15:05 (GMT+7)
- **Prompt:**
  > oke tôi đã kiểm tra và thấy ổn, chuyển sang Bước 3 - Selecting test cases
- **Output:**

  ## FR-14: Quản lý Danh mục (Category CRUD) — Bước 3: Lựa chọn tập Test Cases tối thiểu

  ### A. Valid Test Cases (kết hợp tối đa các Valid ECs)

  | TC ID | Mô tả | Precondition | Input / Thao tác | ECs bao phủ | Expected Output |
  |---|---|---|---|---|---|
  | **TC-V1** | Thêm danh mục thành công (Happy Path) | Vai trò: Admin | Nhập tên danh mục không rỗng (VD: "Điện thoại") → Bấm Thêm | EC1, EC3, EC7 | ✅ Danh mục được tạo thành công, danh sách hiển thị đầy đủ bao gồm danh mục vừa thêm |
  | **TC-V2** | Xóa danh mục thành công | Vai trò: Admin, danh mục cần xóa tồn tại trong DB | Chọn danh mục → Bấm Xóa | EC5 | ✅ Danh mục bị xóa khỏi DB, danh sách không còn hiển thị danh mục đã xóa |

  > **Ghi chú:** 2 test case bao phủ **4/4 Valid ECs**. EC7 được verify như output assertion trên TC-V1 (kiểm tra danh sách hiển thị đầy đủ sau khi thêm).

  ### B. Invalid Test Cases (1 Invalid EC mỗi test case)

  | TC ID | Mô tả | Precondition | Input / Thao tác | Invalid EC | Expected Output |
  |---|---|---|---|---|---|
  | **TC-I1** | Thêm danh mục với tên rỗng | Vai trò: Admin | Để trống tên danh mục → Bấm Thêm | **EC2** | Lỗi validation, danh mục không được tạo |
  | **TC-I2** | Non-admin thử thao tác danh mục | Vai trò: Non-admin (user thường) | Thử truy cập / thao tác quản lý danh mục | **EC4** | Bị từ chối, không thể thao tác |
  | **TC-I3** | Xóa danh mục không tồn tại | Vai trò: Admin | Gửi API xóa danh mục với ID không tồn tại | **EC6** | Lỗi, không có gì bị xóa |

  ### C. Ma trận bao phủ EC ↔ Test Case

  | EC ID | Loại | Mô tả | Bao phủ bởi TC |
  |---|---|---|---|
  | EC1 | ✅ Valid | Tên danh mục không rỗng | TC-V1 |
  | EC2 | ❌ Invalid | Tên danh mục rỗng | TC-I1 |
  | EC3 | ✅ Valid | Vai trò Admin | TC-V1 |
  | EC4 | ❌ Invalid | Vai trò Non-admin | TC-I2 |
  | EC5 | ✅ Valid | Danh mục tồn tại (Xóa) | TC-V2 |
  | EC6 | ❌ Invalid | Danh mục không tồn tại (Xóa) | TC-I3 |
  | EC7 | ✅ Valid | Danh sách hiển thị đầy đủ | TC-V1 *(output assert)* |
  | EC8 | ❌ Invalid | Danh sách không hiển thị đầy đủ | TC-V1 *(negative check)* |

  ### D. Tổng kết

  | Loại | Số lượng TC | ECs bao phủ |
  |---|---|---|
  | Valid Test Cases | 2 | 4/4 Valid ECs ✅ |
  | Invalid Test Cases | 3 | 4/4 Invalid ECs ✅ |
  | **Tổng** | **5** | **8/8 (100%)** |

---

## Log Entry #21

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-06-29 19:18:36 (GMT+7)
- **Prompt:**
  > mặc dù Readme không mô tả nhưng nếu trường hợp Danh mục đó tồn tại (trùng tên) thì sao, có cần test không
- **Output:**

  ### Phân tích: Thêm danh mục trùng tên

  FR-14 chỉ nói:
  > "Tên danh mục là bắt buộc, không được để trống"

  **Không nói gì về tính duy nhất của tên.** Nhưng trong thực tế, hầu hết hệ thống sẽ không cho phép 2 danh mục cùng tên. Đây là hành vi cần test thực tế để xác nhận.

  Áp dụng **quy tắc chia nhỏ**: EC1 cần split vì hành vi khác nhau tùy tên đã tồn tại hay chưa:

  ### Bổ sung Equivalence Class

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC1 *(giữ nguyên)* | ✅ Valid | Tên danh mục không rỗng **VÀ chưa tồn tại** (unique) | Chia nhỏ EC1 gốc |
  | **EC9** *(mới)* | ❌ Invalid | Tên danh mục không rỗng **NHƯNG đã tồn tại** (trùng tên) | Chia nhỏ — hành vi khác biệt. **Spec ambiguity** — cần test thực tế |

  ### Bổ sung Test Case

  | TC ID | Mô tả | Precondition | Input / Thao tác | Invalid EC | Expected Output |
  |---|---|---|---|---|---|
  | **TC-I4** | Thêm danh mục trùng tên | Vai trò: Admin, danh mục "Điện thoại" đã tồn tại | Nhập "Điện thoại" → Bấm Thêm | **EC9** | ⚠️ **Spec ambiguity** — Cần kiểm tra thực tế: (1) Hệ thống từ chối và báo lỗi trùng tên, hoặc (2) Cho phép tạo trùng |

  ### Bảng tổng hợp cập nhật

  | Loại | Số lượng TC | ECs bao phủ |
  |---|---|---|
  | Valid Test Cases | 2 | 4/4 Valid ECs ✅ |
  | Invalid Test Cases | **4** *(+1)* | **5/5** Invalid ECs ✅ |
  | **Tổng** | **6** | **9/9 (100%)** |

---

## Log Entry #22

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-06-29 19:24:28 (GMT+7)
- **Prompt:**
  > oke ổn rồi, chuyển sang Bước 4 - Boundary Value Analysis (BVA)
- **Output:**

  ## FR-14: Quản lý Danh mục (Category CRUD) — Bước 4: Boundary Value Analysis (BVA)

  ### 1. Xác định các trường có thứ tự (Ordered Fields)

  | Biến | Kiểu | Có thứ tự? | Lý do |
  |---|---|---|---|
  | V1 — Tên danh mục | String (length) | ✅ **Có** | Ranh giới tại length = 0 (rỗng) vs length ≥ 1 (không rỗng) |
  | S1 — Vai trò | Enum | ❌ Không | Categorical (Admin/Non-admin), không có khoảng số |
  | S2 — Tồn tại danh mục | Boolean | ❌ Không | Categorical (Có/Không), không có khoảng số |

  → **1 trường cần BVA: V1 (độ dài tên danh mục)**

  ### 2. BVA cho V1: Độ dài tên danh mục (Category Name Length)

  **Phân hoạch:**
  - Invalid: length = 0 (rỗng)
  - Valid: length ≥ 1 (không rỗng)

  **Ranh giới:** giữa 0 và 1

  | # | Điểm biên | Giá trị | Phân hoạch | Kịch bản test | TC ánh xạ |
  |---|---|---|---|---|---|
  | BV1 | **LB invalid (biên)** | **length = 0** | ❌ Invalid | Tên rỗng "" | TC-I1 *(đã có)* |
  | BV2 | **LB valid (biên)** | **length = 1** | ✅ Valid | Tên chỉ 1 ký tự (VD: "A") | **TC-BVA1** *(MỚI)* |
  | BV3 | LB valid + 1 | length = 2 | ✅ Valid | Tên 2 ký tự (VD: "AB") | TC-V1 *(đã có — "Điện thoại" có nhiều ký tự)* |

  > **Ghi chú:** LB - 1 = -1 → không khả thi (length không thể âm), bỏ qua. FR-14 không đặc tả giới hạn tối đa cho tên danh mục → không có Upper Boundary.

  **Bổ sung test case:**

  | TC ID | Mô tả | Precondition | Input | Expected Output | Biên kiểm tra |
  |---|---|---|---|---|---|
  | **TC-BVA1** | Thêm danh mục tên 1 ký tự | Vai trò: Admin | Tên = "A" (1 ký tự) → Bấm Thêm | ✅ Danh mục được tạo thành công | BV2: LB valid (length = 1) |

  ### 3. Tổng hợp toàn bộ Test Cases FR-14 (Bước 3 + Bước 4)

  | TC ID | Mô tả | Loại | ECs / BVs |
  |---|---|---|---|
  | **TC-V1** | Thêm danh mục thành công (Happy Path) | Valid | EC1, EC3, EC7 + BV3 |
  | **TC-V2** | Xóa danh mục thành công | Valid | EC5 |
  | **TC-I1** | Thêm danh mục tên rỗng | Invalid | EC2 + BV1 |
  | **TC-I2** | Non-admin thử thao tác | Invalid | EC4 |
  | **TC-I3** | Xóa danh mục không tồn tại | Invalid | EC6 |
  | **TC-I4** | Thêm danh mục trùng tên | Invalid | EC9 |
  | **TC-BVA1** | Thêm danh mục tên 1 ký tự | BVA | BV2 |

  ### 4. Tổng kết FR-14

  | Nhóm | Test Cases | Số lượng |
  |---|---|---|
  | Valid (Bước 3) | TC-V1, TC-V2 | 2 |
  | Invalid (Bước 3) | TC-I1 → TC-I4 | 4 |
  | BVA (Bước 4) | TC-BVA1 | 1 |
  | **Tổng FR-14** | | **7 test cases** |
  | **ECs coverage** | | **9/9 (100%)** |
  | **BVs coverage** | | **3/3 (100%)** |

---

## Log Entry #23

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-06-29 20:11:35 (GMT+7)
- **Prompt:**
  > dựa vào FR-02.md đã có cho web, kiểm tra xem cần bổ sung gì cho chức năng FR-02: Đăng nhập & Khóa tài khoản ở mobile không, làm đủ 4 bước nếu cần bổ sung.
- **Output:**

  ## Phân tích: FR-02 Mobile vs FR-02 Web

  ### Đặc tả Mobile (FR-20):
  > "Đầy đủ các chức năng: ... **Đăng nhập** ..."

  FR-20 chỉ nói mobile có chức năng Đăng nhập, nhưng **không bổ sung bất kỳ ràng buộc mới nào** so với FR-02. Logic đăng nhập & khóa tài khoản dùng **cùng backend API**, nghĩa là:

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

---

## Log Entry #24

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-06-30 10:13:25 (GMT+7)
- **Prompt:**
  > giờ tôi muốn làm FR-04: Quản lý hồ sơ cá nhân cho mobile. Bắt đầu làm Bước 1 - Xác định các biến Đầu vào (Input) và Đầu ra (Output)
- **Output:**

  ## FR-04: Quản lý hồ sơ cá nhân (Mobile) — Bước 1: Input Variables & Domains

  Đặc tả FR-04 nguyên văn:
  > - Người dùng đã đăng nhập có thể cập nhật: **Họ Tên**, **Số điện thoại**, **Địa chỉ giao hàng mặc định**.
  > - **Số điện thoại hợp lệ**: bắt đầu bằng số `0`, từ 10–11 chữ số.
  > - Email không được phép thay đổi qua giao diện.
  > - Người dùng chỉ có thể cập nhật hồ sơ của chính mình; không thể tự thay đổi thuộc tính `role`.

  ### A. Biến đầu vào trực tiếp (UI Input Variables)

  | # | Biến | Kiểu | Miền giá trị (Domain) | Nguồn đặc tả |
  |---|---|---|---|---|
  | V1 | **Họ Tên** | String | Chuỗi ký tự, có thể cập nhật | FR-04: "cập nhật: Họ Tên" |
  | V2 | **Số điện thoại** | String | Bắt đầu bằng số `0`, từ 10–11 chữ số | FR-04: "bắt đầu bằng số 0, từ 10–11 chữ số" |
  | V3 | **Địa chỉ giao hàng mặc định** | String | Chuỗi ký tự, có thể cập nhật | FR-04: "cập nhật: Địa chỉ giao hàng mặc định" |

  ### B. Biến trạng thái hệ thống (System State)

  | # | Biến | Kiểu | Miền giá trị (Domain) | Nguồn đặc tả |
  |---|---|---|---|---|
  | S1 | **Trạng thái đăng nhập** | Boolean | {Đã đăng nhập, Chưa đăng nhập} | FR-04: "Người dùng **đã đăng nhập** có thể cập nhật" |
  | S2 | **Quyền sở hữu hồ sơ** | Boolean | {Hồ sơ của chính mình, Hồ sơ của người khác} | FR-04: "chỉ có thể cập nhật hồ sơ **của chính mình**" |

  ### C. Biến đầu ra (Output Variables)

  | # | Biến | Kiểu | Miền giá trị (Domain) | Nguồn đặc tả |
  |---|---|---|---|---|
  | O1 | **Kết quả cập nhật** | Enum | {Thành công, Thất bại} | FR-04 |
  | O2 | **Trạng thái trường Email trên UI** | UI State | {Read-only (không cho sửa), Editable (cho sửa)} | FR-04: "Email **không được phép** thay đổi qua giao diện" |
  | O3 | **Trạng thái thuộc tính Role qua API** | API Behavior | {Không cho thay đổi từ client, Cho phép thay đổi} | FR-04: "không thể tự thay đổi thuộc tính `role`" |

---

## Log Entry #25

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-06-30 10:21:40 (GMT+7)
- **Prompt:**
  > Tốt, giờ chuyển sang bước 2 - Xác định các Phân hoạch Tương đương (Equivalence Classes)
- **Output:**

  ## FR-04: Quản lý hồ sơ cá nhân (Mobile) — Bước 2: Equivalence Classes

  ### Biến S1: Trạng thái đăng nhập
  **Nguyên tắc áp dụng:** "Must be" (phải đã đăng nhập mới cập nhật được)

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC1 | ✅ Valid | Người dùng đã đăng nhập | Must be — thỏa mãn |
  | EC2 | ❌ Invalid | Người dùng chưa đăng nhập | Must be — không thỏa mãn |

  ### Biến S2: Quyền sở hữu hồ sơ
  **Nguyên tắc áp dụng:** "Must be" (chỉ cập nhật hồ sơ của chính mình)

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC3 | ✅ Valid | Cập nhật hồ sơ của chính mình | Must be — thỏa mãn |
  | EC4 | ❌ Invalid | Cố gắng cập nhật hồ sơ của người khác (qua API) | Must be — không thỏa mãn |

  ### Biến V2: Số điện thoại
  **Nguyên tắc áp dụng:** "Must be" (bắt đầu bằng 0, toàn chữ số) + Range (10–11 chữ số)

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC5 | ✅ Valid | Số điện thoại hợp lệ — bắt đầu bằng `0`, 10–11 chữ số, toàn bộ là ký tự số | Must be + Range — thỏa mãn |
  | EC6 | ❌ Invalid | Không bắt đầu bằng `0` (VD: `1234567890`) | Must be — không thỏa mãn |
  | EC7 | ❌ Invalid | Ít hơn 10 chữ số (VD: `012345678` — 9 chữ số) | Range — dưới LB |
  | EC8 | ❌ Invalid | Nhiều hơn 11 chữ số (VD: `012345678901` — 12 chữ số) | Range — trên UB |
  | EC9 | ❌ Invalid | Chứa ký tự không phải số (VD: `0123abc456`) | Must be — không thỏa mãn ("chữ số") |

  ### Biến V1, V3: Họ Tên, Địa chỉ giao hàng
  > FR-04 không đặc tả ràng buộc cụ thể cho Họ Tên và Địa chỉ (không nói bắt buộc, không giới hạn format). Hai trường này sẽ được verify như **output assertions** trong test case hợp lệ (kiểm tra giá trị cập nhật có lưu đúng không).

  ### Biến O2: Trạng thái trường Email trên UI
  **Nguyên tắc áp dụng:** "Must be" (Email không được phép thay đổi)

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC10 | ✅ Valid | Trường Email hiển thị dạng read-only, không cho phép sửa | Must be — thỏa mãn |
  | EC11 | ❌ Invalid | Trường Email có thể chỉnh sửa trên giao diện | Must be — không thỏa mãn |

  ### Biến O3: Trạng thái thuộc tính Role qua API
  **Nguyên tắc áp dụng:** "Must be" (không thể tự thay đổi role)

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC12 | ✅ Valid | API từ chối / bỏ qua khi client gửi thay đổi `role` | Must be — thỏa mãn |
  | EC13 | ❌ Invalid | API chấp nhận thay đổi `role` từ client (lỗi bảo mật) | Must be — không thỏa mãn |

  ### Bảng tổng hợp

  | Nhóm | Valid ECs | Invalid ECs | Tổng |
  |---|---|---|---|
  | S1 — Trạng thái đăng nhập | EC1 | EC2 | 2 |
  | S2 — Quyền sở hữu | EC3 | EC4 | 2 |
  | V2 — Số điện thoại | EC5 | EC6, EC7, EC8, EC9 | 5 |
  | O2 — Email read-only | EC10 | EC11 | 2 |
  | O3 — Role protection | EC12 | EC13 | 2 |
  | **Tổng** | **5 Valid** | **8 Invalid** | **13 ECs** |

---

## Log Entry #26

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-06-30 10:25:45 (GMT+7)
- **Prompt:**
  > có cần các EC cho các biến đầu vào trực tiếp như họ tên,địa chỉ giao hàng không
- **Output:**

  ### Phân tích: V1 (Họ Tên) và V3 (Địa chỉ giao hàng) có cần EC không?

  FR-04 chỉ nói:
  > "Người dùng đã đăng nhập có thể **cập nhật**: Họ Tên, Số điện thoại, Địa chỉ giao hàng mặc định"

  **Không có ràng buộc validation nào** cho Họ Tên và Địa chỉ (khác với Số điện thoại có ràng buộc rõ ràng). Vì vậy, từ góc độ đặc tả thuần túy:

  - Không có gì để phân hoạch (không có "Must be", không có Range, không có Set)
  - Hai trường này chỉ được mô tả là "có thể cập nhật"

  **Tuy nhiên**, nếu muốn test thêm trường hợp rỗng (empty) cho các trường này — đây sẽ là trường hợp **spec ambiguity** (đặc tả không nói rõ có bắt buộc hay không), tương tự cách xử lý EC23 ở FR-02 hay EC9 ở FR-14.

---

## Log Entry #27

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-06-30 10:34:41 (GMT+7)
- **Prompt:**
  > thêm trường hợp rỗng cho tôi đi
- **Output:**

  ### Bổ sung EC cho V1 và V3

  #### Biến V1: Họ Tên
  **Nguyên tắc:** Spec ambiguity — đặc tả không nói rõ có bắt buộc hay không

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | **EC14** | ❌ Invalid | Họ Tên rỗng (không nhập gì) | **Spec ambiguity** — cần test thực tế: hệ thống chấp nhận hay từ chối |

  #### Biến V3: Địa chỉ giao hàng mặc định
  **Nguyên tắc:** Spec ambiguity — đặc tả không nói rõ có bắt buộc hay không

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | **EC15** | ❌ Invalid | Địa chỉ giao hàng rỗng (không nhập gì) | **Spec ambiguity** — cần test thực tế |

  ### Bảng tổng hợp (cập nhật)

  | Nhóm | Valid ECs | Invalid ECs | Tổng |
  |---|---|---|---|
  | S1 — Trạng thái đăng nhập | EC1 | EC2 | 2 |
  | S2 — Quyền sở hữu | EC3 | EC4 | 2 |
  | V2 — Số điện thoại | EC5 | EC6, EC7, EC8, EC9 | 5 |
  | O2 — Email read-only | EC10 | EC11 | 2 |
  | O3 — Role protection | EC12 | EC13 | 2 |
  | V1 — Họ Tên | *(TC-V1)* | EC14 | 1 |
  | V3 — Địa chỉ giao hàng | *(TC-V1)* | EC15 | 1 |
  | **Tổng** | **5 Valid** | **10 Invalid** | **15 ECs** |

---

## Log Entry #28

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-06-30 10:38:14 (GMT+7)
- **Prompt:**
  > bỏ qua. Bây giờ chuyển sang Bước 3 - selecting test cases
- **Output:**

  ## FR-04: Quản lý hồ sơ cá nhân (Mobile) — Bước 3: Lựa chọn tập Test Cases tối thiểu

  ### A. Valid Test Cases (kết hợp tối đa các Valid ECs)

  | TC ID | Mô tả | Precondition | Input / Thao tác | ECs bao phủ | Expected Output |
  |---|---|---|---|---|---|
  | **TC-V1** | Cập nhật hồ sơ thành công (Happy Path) | Đã đăng nhập, hồ sơ của chính mình | Nhập Họ Tên hợp lệ, SĐT `0912345678` (10 số, bắt đầu bằng 0), Địa chỉ hợp lệ → Bấm Lưu | EC1, EC3, EC5, EC10, EC12 | ✅ Cập nhật thành công, dữ liệu lưu đúng. Email hiển thị read-only. Role không đổi |

  > **Ghi chú:** 1 test case bao phủ **5/5 Valid ECs**. EC10 và EC12 được verify như output assertions.

  ### B. Invalid Test Cases (1 Invalid EC mỗi test case)

  | TC ID | Mô tả | Precondition | Input / Thao tác | Invalid EC | Expected Output |
  |---|---|---|---|---|---|
  | **TC-I1** | Cập nhật khi chưa đăng nhập | Chưa đăng nhập | Gửi API cập nhật hồ sơ | **EC2** | Bị từ chối (401/403) |
  | **TC-I2** | Cập nhật hồ sơ người khác | Đã đăng nhập | Gửi API cập nhật hồ sơ user khác (đổi userId) | **EC4** | Bị từ chối, hồ sơ người khác không bị thay đổi |
  | **TC-I3** | SĐT không bắt đầu bằng 0 | Đã đăng nhập, hồ sơ mình | SĐT = `1234567890` | **EC6** | Lỗi validation |
  | **TC-I4** | SĐT quá ngắn (< 10 số) | Đã đăng nhập, hồ sơ mình | SĐT = `012345678` (9 số) | **EC7** | Lỗi validation |
  | **TC-I5** | SĐT quá dài (> 11 số) | Đã đăng nhập, hồ sơ mình | SĐT = `012345678901` (12 số) | **EC8** | Lỗi validation |
  | **TC-I6** | SĐT chứa ký tự không phải số | Đã đăng nhập, hồ sơ mình | SĐT = `0123abc456` | **EC9** | Lỗi validation |
  | **TC-I7** | Email có thể sửa trên UI | Đã đăng nhập | Kiểm tra trường Email trên giao diện | **EC11** | Email phải read-only, không cho sửa *(negative check)* |
  | **TC-I8** | Gửi API thay đổi role | Đã đăng nhập, hồ sơ mình | Gửi payload có `role: "admin"` | **EC13** | API từ chối / bỏ qua, role không đổi *(negative check)* |
  | **TC-I9** | Họ Tên rỗng | Đã đăng nhập, hồ sơ mình | Họ Tên = *(rỗng)*, SĐT hợp lệ, Địa chỉ hợp lệ | **EC14** | ⚠️ Spec ambiguity — cần test thực tế |
  | **TC-I10** | Địa chỉ giao hàng rỗng | Đã đăng nhập, hồ sơ mình | Họ Tên hợp lệ, SĐT hợp lệ, Địa chỉ = *(rỗng)* | **EC15** | ⚠️ Spec ambiguity — cần test thực tế |

  ### C. Ma trận bao phủ EC ↔ Test Case

  | EC ID | Loại | Mô tả | Bao phủ bởi TC |
  |---|---|---|---|
  | EC1 | ✅ Valid | Đã đăng nhập | TC-V1 |
  | EC2 | ❌ Invalid | Chưa đăng nhập | TC-I1 |
  | EC3 | ✅ Valid | Hồ sơ của chính mình | TC-V1 |
  | EC4 | ❌ Invalid | Hồ sơ người khác | TC-I2 |
  | EC5 | ✅ Valid | SĐT hợp lệ (0, 10–11 số) | TC-V1 |
  | EC6 | ❌ Invalid | SĐT không bắt đầu bằng 0 | TC-I3 |
  | EC7 | ❌ Invalid | SĐT < 10 số | TC-I4 |
  | EC8 | ❌ Invalid | SĐT > 11 số | TC-I5 |
  | EC9 | ❌ Invalid | SĐT chứa ký tự không phải số | TC-I6 |
  | EC10 | ✅ Valid | Email read-only | TC-V1 *(output assert)* |
  | EC11 | ❌ Invalid | Email editable | TC-I7 *(negative check)* |
  | EC12 | ✅ Valid | Role không đổi | TC-V1 *(output assert)* |
  | EC13 | ❌ Invalid | Role có thể đổi | TC-I8 *(negative check)* |
  | EC14 | ❌ Invalid | Họ Tên rỗng | TC-I9 |
  | EC15 | ❌ Invalid | Địa chỉ rỗng | TC-I10 |

  ### D. Tổng kết

  | Loại | Số lượng TC | ECs bao phủ |
  |---|---|---|
  | Valid Test Cases | 1 | 5/5 Valid ECs ✅ |
  | Invalid Test Cases | 10 | 10/10 Invalid ECs ✅ |
  | **Tổng** | **11** | **15/15 (100%)** |

---

## Log Entry #29

- **Công cụ AI:** Gemini - Antigravity IDE (Claude Opus 4.6 Thinking)
- **Ngày giờ:** 2026-07-01 08:27:55 (GMT+7)
- **Prompt:**
  > oke ổn rồi, giờ chuyển sang Bước 4 - Phân tích Giá trị Biên (Boundary Value Analysis - BVA)
- **Output:**

  ## FR-04: Quản lý hồ sơ cá nhân (Mobile) — Bước 4: Boundary Value Analysis (BVA)

  ### 1. Xác định các trường có thứ tự (Ordered Fields)

  | Biến | Kiểu | Có thứ tự? | Lý do |
  |---|---|---|---|
  | V1 — Họ Tên | String | ❌ Không | FR-04 không đặc tả ràng buộc độ dài |
  | **V2 — Số điện thoại** | String (length) | ✅ **Có** | Range rõ ràng: 10–11 chữ số |
  | V3 — Địa chỉ | String | ❌ Không | FR-04 không đặc tả ràng buộc độ dài |
  | S1 — Đăng nhập | Boolean | ❌ Không | Categorical |
  | S2 — Quyền sở hữu | Boolean | ❌ Không | Categorical |

  → **1 trường cần BVA: V2 (độ dài số điện thoại)**

  ### 2. BVA cho V2: Độ dài Số điện thoại (Phone Length)

  **Phân hoạch:**
  - Invalid (dưới): length < 10
  - Valid: 10 ≤ length ≤ 11
  - Invalid (trên): length > 11

  **Ranh giới:** LB = 10, UB = 11

  | # | Điểm biên | Giá trị | Phân hoạch | Kịch bản test | TC ánh xạ |
  |---|---|---|---|---|---|
  | BV1 | **LB - 1** | **length = 9** | ❌ Invalid | SĐT 9 chữ số (VD: `012345678`) | TC-I4 *(đã có)* |
  | BV2 | **LB (biên)** | **length = 10** | ✅ Valid | SĐT đúng 10 chữ số (VD: `0912345678`) | TC-V1 *(đã có)* |
  | BV3 | **UB (biên)** | **length = 11** | ✅ Valid | SĐT đúng 11 chữ số (VD: `09123456789`) | **TC-BVA1** *(MỚI)* |
  | BV4 | **UB + 1** | **length = 12** | ❌ Invalid | SĐT 12 chữ số (VD: `012345678901`) | TC-I5 *(đã có)* |

  > **Ghi chú:** Range chỉ gồm 2 giá trị (10, 11) nên LB+1 = UB và UB-1 = LB. Tổng cộng 4 điểm biên phân biệt.

  **Bổ sung test case:**

  | TC ID | Mô tả | Precondition | Input | Expected Output | Biên kiểm tra |
  |---|---|---|---|---|---|
  | **TC-BVA1** | Cập nhật SĐT đúng 11 chữ số | Đã đăng nhập, hồ sơ mình | SĐT = `09123456789` (11 chữ số, bắt đầu bằng 0) | ✅ Cập nhật thành công | BV3: UB (length = 11) |

  ### 3. Tổng hợp toàn bộ Test Cases FR-04 (Bước 3 + Bước 4)

  | TC ID | Mô tả | Loại | ECs / BVs |
  |---|---|---|---|
  | **TC-V1** | Cập nhật hồ sơ thành công (Happy Path) | Valid | EC1, EC3, EC5, EC10, EC12 + BV2 |
  | **TC-I1** | Cập nhật khi chưa đăng nhập | Invalid | EC2 |
  | **TC-I2** | Cập nhật hồ sơ người khác | Invalid | EC4 |
  | **TC-I3** | SĐT không bắt đầu bằng 0 | Invalid | EC6 |
  | **TC-I4** | SĐT quá ngắn (9 số) | Invalid | EC7 + BV1 |
  | **TC-I5** | SĐT quá dài (12 số) | Invalid | EC8 + BV4 |
  | **TC-I6** | SĐT chứa ký tự không phải số | Invalid | EC9 |
  | **TC-I7** | Email có thể sửa trên UI | Invalid | EC11 |
  | **TC-I8** | Gửi API thay đổi role | Invalid | EC13 |
  | **TC-I9** | Họ Tên rỗng | Invalid | EC14 |
  | **TC-I10** | Địa chỉ giao hàng rỗng | Invalid | EC15 |
  | **TC-BVA1** | SĐT đúng 11 chữ số | BVA | BV3 |

  ### 4. Tổng kết FR-04

  | Nhóm | Test Cases | Số lượng |
  |---|---|---|
  | Valid (Bước 3) | TC-V1 | 1 |
  | Invalid (Bước 3) | TC-I1 → TC-I10 | 10 |
  | BVA (Bước 4) | TC-BVA1 | 1 |
  | **Tổng FR-04** | | **12 test cases** |
  | **ECs coverage** | | **15/15 (100%)** |
  | **BVs coverage** | | **4/4 (100%)** |

---
