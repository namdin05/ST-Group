# AI Audit Report

## AI Interaction 01

**Name of the AI tool:** Codex

**Date and time:** 2026-08-14T13:59:02.2564857+07:00

**Your prompt:**

> Tôi đã có sẵn skill [SKILL.md](audit-skill/SKILL.md) cho audit rồi, bạn chỉ cần điều chỉnh đường dẫn cho phù hợp, còn lại cứ làm theo yêu cầu

**The AI output:**

> Mình sẽ dùng skill audit bạn đã cung cấp, chỉ điều chỉnh các đường dẫn cho khớp workspace hiện tại rồi thực hiện nguyên vẹn quy trình trong đó. Trước hết mình đang đọc đầy đủ yêu cầu đính kèm và `audit-skill/SKILL.md`.
> 
> Khảo sát ban đầu cho thấy thư mục `HW05` hiện chỉ có đề bài Version 2.0 và skill audit; chưa có source SUT, API spec, cấu hình JMeter/k6 hay report. Mình đang kiểm tra convention của repository cha và bài trước để tái sử dụng cách tổ chức phù hợp, đồng thời sẽ giữ nguyên mọi thay đổi sẵn có ngoài phạm vi `HW05`.
> 
> Các endpoint WF01 có thể xác định từ tài liệu và source SUT nằm ở `HW04/src` trong cùng repository cha: login, search, product detail, cart và checkout đều có route rõ ràng. Mình sẽ ghi chúng vào workflow kèm nguồn và vẫn để base URL/cấu hình chạy là `TODO`, vì bản SUT dùng cho HW05 chưa được đặt trong thư mục này và cần được xác nhận trước khi chạy. Skill audit cũng buộc mình đổi đích ghi sang `ai-audit/AI_Audit.md`; ngoài thay đổi đường dẫn đó, mình giữ nguyên logic của skill.
> 
> Đã hoàn tất scaffold HW05: tạo 29 thư mục và 42 tệp mới, cập nhật 1 tệp skill có sẵn. Không chạy performance test, không tạo `.jtl`/HTML/screenshot/số liệu giả và không commit Git.
> 
> ## A. Structure Created
> 
> ```text
> C:\Code\SoftwareTesting\ST-Group\23127430\HW05\
> ├── .gitignore
> ├── README.md
> ├── main_report.md
> ├── 2026.HW05.Performance Testing_En_2.0_HTThanh.md
> ├── audit-skill/SKILL.md
> ├── agent-skill/
> │   ├── SKILL.md
> │   └── README.md
> ├── ai-audit/
> │   ├── AI_Audit.md
> │   └── prompts/README.md
> ├── ai-critique/AI_Critique.md
> ├── docs/
> │   ├── workflow/WF01_workflow.md
> │   ├── test-design/{load,stress,spike,endurance}_test_design.md
> │   ├── human-review/ai_test_plan_review.md
> │   ├── ai-analysis/result_analysis.md
> │   ├── continuous-performance/continuous_performance_testing.md
> │   └── bug-reports/README.md
> ├── test-plans/
> │   ├── README.md
> │   └── {load,stress,spike,endurance}/.gitkeep
> ├── test-data/
> │   ├── users.csv
> │   ├── products.csv
> │   └── README.md
> ├── results/
> │   ├── README.md
> │   ├── raw/{load,stress,spike,endurance}/.gitkeep
> │   └── html/{load,stress,spike,endurance}/.gitkeep
> ├── evidence/
> │   ├── README.md
> │   └── {hardware,load,stress,spike,endurance}/.gitkeep
> ├── video/README.md
> └── git/git_commit_log.txt
> ```
> 
> ## B. Files Created
> 
> - Root: [.gitignore](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/.gitignore), [README.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/README.md), [main_report.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/main_report.md).
> - Workflow/test design/review: [WF01_workflow.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/workflow/WF01_workflow.md), [load](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/test-design/load_test_design.md), [stress](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/test-design/stress_test_design.md), [spike](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/test-design/spike_test_design.md), [endurance](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/test-design/endurance_test_design.md), [human review](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/human-review/ai_test_plan_review.md), [result analysis](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/ai-analysis/result_analysis.md), [continuous performance](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/continuous-performance/continuous_performance_testing.md), [bug-report guide](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/bug-reports/README.md).
> - Test-plan/data: [test-plans/README.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/test-plans/README.md), bốn placeholder scenario, [users.csv](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/test-data/users.csv), [products.csv](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/test-data/products.csv), [test-data/README.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/test-data/README.md).
> - Results/evidence: [results/README.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/results/README.md), tám placeholder raw/HTML, [evidence/README.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/evidence/README.md), năm placeholder evidence.
> - AI/support: [AI_Audit.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/ai-audit/AI_Audit.md), [prompts/README.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/ai-audit/prompts/README.md), [AI_Critique.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/ai-critique/AI_Critique.md), [agent-skill/SKILL.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/agent-skill/SKILL.md), [agent-skill/README.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/agent-skill/README.md), [video/README.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/video/README.md), [git_commit_log.txt](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/git/git_commit_log.txt).
> 
> ## C. Files Modified
> 
> - [audit-skill/SKILL.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/audit-skill/SKILL.md): chỉ đổi hai tham chiếu đích từ `../ai_audit_report.md` sang `../ai-audit/AI_Audit.md`; các quy tắc còn lại được giữ nguyên.
> 
> ## D. Existing Files Reused
> 
> - [Đề bài Version 2.0](<C:/Code/SoftwareTesting/ST-Group/23127430/HW05/2026.HW05.Performance Testing_En_2.0_HTThanh.md>) được dùng làm nguồn yêu cầu; không chỉnh sửa.
> - Skill audit có sẵn được tái sử dụng sau khi điều chỉnh đường dẫn.
> - Convention HW04 (`README`, `main_report`, audit, critique, agent skill, Git log) được tham khảo; không sao chép kết quả hay evidence cũ.
> - Source và API spec HW04 trong cùng Git repository được đọc làm evidence sơ bộ cho WF01; không chỉnh sửa.
> 
> ## E. TODOs Requiring Human Input
> 
> - Student ID và student name.
> - Chọn JMeter hoặc k6.
> - Xác nhận phiên bản SUT và base URL thực tế.
> - Xác nhận lại API endpoints/payloads với đúng bản SUT dùng cho HW05.
> - Cung cấp test accounts/credentials an toàn, quy trình unlock/reset và cách quản lý secret.
> - Chuẩn bị keywords, product IDs, shipping data và chiến lược cô lập cart/session.
> - Hardware, hostname và môi trường chạy.
> - VUs/threads, ramp-up, hold, ramp-down, think time.
> - Assertions, acceptance thresholds, endurance threshold và report/listener tương ứng.
> - Demo video link và self-assessment.
> 
> ## F. Repository Findings
> 
> - `HW05` ban đầu chỉ là homework repository: có đề bài và audit skill; không có source SUT, report, JMeter/k6 config hay test result.
> - [API specification](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/src/api_specification.md) và [backend routes](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/src/backend/server.js) xác định sơ bộ: `POST /api/login`, `GET /api/products?search=...`, `GET /api/products/:id`, `POST /api/cart`, `POST /api/checkout`.
> - [AuthContext.jsx](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/src/frontend-web/src/context/AuthContext.jsx) xác nhận JWT bearer token; [Home.jsx](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/src/frontend-web/src/pages/Home.jsx), [ProductDetail.jsx](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/src/frontend-web/src/pages/ProductDetail.jsx) và [Checkout.jsx](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/src/frontend-web/src/pages/Checkout.jsx) xác nhận search/detail/checkout phía frontend.
> - Một điểm cần human review: frontend cũ thêm sản phẩm vào cart bằng state phía client, trong khi backend/API spec vẫn có `POST /api/cart`. Vì vậy mapping đã được ghi kèm yêu cầu xác nhận lại đúng build HW05 trước khi implement.
> - `AI Interaction 01` của phiên làm việc này đã được ghi nguyên văn và xác minh trong [AI_Audit.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/ai-audit/AI_Audit.md).
> 
> ## G. Next Recommended Step
> 
> Xác nhận đúng SUT build/base URL và chọn JMeter hoặc k6, sau đó human-review mapping WF01 trước khi điền workload hay tạo test plan thực thi.

## AI Interaction 02

**Name of the AI tool:** Codex

**Date and time:** 2026-08-14T14:24:31.5165474+07:00

**Your prompt:**

> Source code nằm ở [src](src/)

**The AI output:**

> Mình sẽ khảo sát lại trực tiếp `src/`, đối chiếu các endpoint WF01 với source hiện tại, rồi cập nhật những chỗ đang ghi “chưa có SUT source” hoặc đang dựa vào `HW04/src`. Mình vẫn giữ nguyên phạm vi scaffold: không chạy performance test và không tạo kết quả giả.
> 
> Yêu cầu đính kèm cũng yêu cầu thêm interaction hiện tại vào AI Audit, nên mình sẽ dùng lại `audit-skill` và ghi đúng định dạng/nguyên văn theo skill; entry mới sẽ được thêm sau khi phân tích và xác minh xong. Trước khi làm tiếp, mình đang đọc lại toàn bộ skill và lập checklist source → workflow → functional verification → CSV → audit.
> 
> Source hiện tại xác nhận backend là Express/SQLite tại port 3000 và frontend web là React/Vite tại 5173. Có hai điểm state rất quan trọng cho 50 VU: cart backend nằm trong RAM và được khóa theo `userId`, còn frontend lại giữ cart riêng trong React state; checkout không đọc cart backend. Mình đang kiểm tra database hiện có và điều kiện khởi động vì `database.js` có lệnh drop/reseed bảng, nên chưa thể chạy server trực tiếp trước khi bảo đảm không làm thay đổi dữ liệu của bạn.
> 
> Database hiện tại có 119 user, trong khi khởi động backend sẽ chạy `DROP TABLE` rồi seed lại chỉ 2 user. Vì vậy mình sẽ không khởi động trực tiếp trên `src/backend/database.sqlite`. Để vẫn đáp ứng functional verification, mình sẽ chạy đúng `server.js`/`database.js` trong một thư mục tạm cô lập, gọi WF01 đúng một lần, dừng server, xóa bản tạm và đối chiếu hash để bảo đảm database gốc không đổi. Đây chỉ là functional check tuần tự, không phải load test.
> 
> Functional verification đã hoàn tất cả 5 bước với business assertions (không chỉ kiểm tra HTTP 200), và bản `database.sqlite` gốc không thay đổi. Tài liệu hiện phản ánh đúng các lệch quan trọng của source: lockout thực tế xảy ra sau 2 lần sai trong khoảng 3 phút, cart theo `userId` nằm trong RAM, và checkout tạo order độc lập với cart. Mình đang làm lượt kiểm tra cuối để loại bỏ mô tả cũ/stale và bảo đảm không lộ credential/token trong deliverables.
> 
> Đã phân tích trực tiếp `src/`, hoàn thiện tài liệu WF01 và chạy đúng một functional API verification trong môi trường tạm cô lập. Cả 5 bước đều được xác minh; database gốc vẫn giữ nguyên. Không chạy performance test, không tạo `.jmx`, `.jtl`, HTML report hay số liệu hiệu năng.
> 
> ## A. WF01 API Mapping
> 
> | Step | Method / Endpoint | Auth | Input | Output | Correlation |
> |---|---|---|---|---|---|
> | Login | `POST /api/login` | Không | `email`, `password` | 200: `message`, JWT `token`, `user` | Extract token; JWT chứa `user.id` |
> | Search | `GET /api/products?search={keyword}` | Không | Query `search` | JSON array sản phẩm | Extract `id`, `name`, `price` |
> | Product Detail | `GET /api/products/{productId}` | Không | `productId` từ Search | Product JSON; ID không tồn tại trả 200 `{}` | Assert response `id` khớp ID đã extract |
> | Add to Cart | `POST /api/cart` | Bearer JWT | `id`, `name`, `price`, `quantity` | `Added to cart` | JWT `user.id` chọn cart trong RAM; không có `cartId` |
> | Checkout | `POST /api/checkout` | Bearer JWT | Handler đọc `total_amount`, `shipping_address` | `message`, integer `orderId` | JWT `user.id` → `orders.user_id`; extract `orderId` |
> 
> ## B. Source Evidence
> 
> - [server.js](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/src/backend/server.js:32): login, JWT middleware, product, cart, checkout và order handlers.
> - [database.js](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/src/backend/database.js:13): destructive initialization, schema `users`/`products`/`orders` và seed logic.
> - [AuthContext.jsx](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/src/frontend-web/src/context/AuthContext.jsx:8): frontend login, localStorage và Bearer header.
> - [Home.jsx](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/src/frontend-web/src/pages/Home.jsx:12) và [ProductDetail.jsx](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/src/frontend-web/src/pages/ProductDetail.jsx:14): Search → product ID → Detail.
> - [CartContext.jsx](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/src/frontend-web/src/context/CartContext.jsx:5) và [Checkout.jsx](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/src/frontend-web/src/pages/Checkout.jsx:40): cart frontend-only và payload checkout thực tế.
> - [API specification](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/src/api_specification.md:24), [requirements](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/src/README.md:39) và [setup guide](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/src/setup_guide.md:12) được dùng để cross-check.
> 
> ## C. Authentication Model
> 
> EShop dùng stateless JWT, không dùng cookie hay server session. Performance tool phải extract `token` từ Login và gửi `Authorization: Bearer <token>` cho Cart, Checkout và order read-back. Frontend lưu token trong `localStorage`; source không cấu hình thời hạn JWT. Cart backend được phân vùng bằng `user.id` trong token, không phải bằng token string hay cart ID.
> 
> ## D. Correlation Map
> 
> ```text
> users.csv: email/password/shipping_address
>   → Login: token + user.id
>   → Search: product.id + name + price
>   → Detail: product.id phải khớp
>   → Cart: token user.id + product fields + quantity
>   → Checkout: token user.id + total_amount + shipping_address
>   → orderId
> ```
> 
> Không có cookie, session ID hoặc cart ID. Checkout hiện không đọc cart backend.
> 
> ## E. Functional Verification
> 
> | Step | Status | Business check |
> |---|---|---|
> | Login | VERIFIED | Nhận token hợp lệ |
> | Search | VERIFIED | Có kết quả và extract được product ID |
> | Product Detail | VERIFIED | ID response khớp Search |
> | Add to Cart | VERIFIED | `GET /api/cart` xác nhận item/quantity đã thay đổi |
> | Checkout | VERIFIED | Có integer `orderId`; order tồn tại trong `my-orders` |
> 
> Verification chạy tuần tự trên bản sao tạm của backend với SQLite tạm. Backend đã được dừng, thư mục tạm đã xóa, port 3000 không còn listener, và database gốc vẫn có 119 users/0 orders với hash không đổi.
> 
> ## F. CSV Strategy
> 
> - [users.csv](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/test-data/users.csv): `email,password,shipping_address`; khuyến nghị một account cho mỗi VU đang active hoặc pool không chồng lấn. Email cần unique theo concurrent VU; credential được provision ngoài Git.
> - [products.csv](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/test-data/products.csv): chỉ `keyword`. Không hard-code `product_id`; ID phải được extract từ Search để giữ đúng business flow.
> - Keyword có thể dùng chung nhưng nên trả về một sản phẩm ổn định; nếu có nhiều kết quả, test design phải quy định cách chọn deterministic.
> 
> ## G. State / Cleanup Risks
> 
> - Lockout implementation tăng counter thêm 2 và khóa sau lần sai thứ hai trong khoảng 3 phút, khác requirement 3 lần/30 giây; không có unlock endpoint.
> - Nhiều VU dùng chung account sẽ ghi vào cùng `userCarts[userId]`; mỗi lần add chỉ append, nên cart collision và tăng bộ nhớ.
> - Frontend dùng React cart riêng, không gọi backend Cart API; Checkout backend cũng không đọc hoặc clear cart.
> - Mỗi Checkout thêm một order; không có cleanup endpoint nên repeated runs làm database tăng.
> - Source không có stock field/order items và không giảm tồn kho; stock depletion không xảy ra trong implementation hiện tại.
> - Backend cart chỉ tồn tại trong một process; restart làm mất cart, nhưng khởi động backend cũng drop/reseed database.
> - JWT không có expiry do ứng dụng cấu hình; account isolation và lifecycle token phải được test design quản lý.
> 
> ## H. Files Created
> 
> - [WF01_verification.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/workflow/WF01_verification.md).
> 
> ## I. Files Modified
> 
> - [WF01_workflow.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/workflow/WF01_workflow.md).
> - [users.csv](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/test-data/users.csv), [products.csv](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/test-data/products.csv), [test-data/README.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/test-data/README.md).
> - [.gitignore](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/.gitignore), [README.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/README.md), [main_report.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/main_report.md).
> - [AI_Audit.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/ai-audit/AI_Audit.md): thêm `AI Interaction 02`; purpose là WF01 API analysis/functional verification, human review status là **Pending**.
> 
> Không chỉnh sửa file nào trong `src/`.
> 
> ## J. Open Questions / TODO
> 
> - Human phải quyết định benchmark backend `POST /api/cart` hay mô phỏng cart frontend-only.
> - Xác định `shipping_address` có phải field bắt buộc hay script sẽ mirror payload frontend đang bỏ qua field này.
> - Phê duyệt disposable database/reset strategy cho cart và orders.
> - Xác nhận môi trường performance dùng một hay nhiều backend process.
> - Provision đủ account riêng cho concurrent VUs mà không commit secrets.
> - Chọn JMeter/k6, hardware, workload, assertions threshold và acceptance criteria ở bước kế tiếp.
> 
> ## K. Readiness Assessment
> 
> **READY FOR LOAD TEST DESIGN**
> 
> Mapping, auth, correlation, state model, assertions và functional flow đã được xác minh. Chưa sẵn sàng chạy Load Test cho đến khi human duyệt cart scope, account pool, cleanup/isolation, tool, hardware, workload và threshold.
