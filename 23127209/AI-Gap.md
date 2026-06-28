## FR-02
- AI thiếu test case kiểm tra nhập sai khi được mở khóa. Lỗi này do thiếu sót trong requirement và chỉ được tìm thấy do kinh nghiệm của tester
- Thiếu test case bộ đếm tăng 1 lần. AI thiếu trường hợp này, có thể do thiếu requirement rõ và có thể điều này hiển nhiên, tuy nhiên tester vẫn muốn kiếm tra
- AI tập trung vào các biến input mà bỏ qua một số biến output. Có thể do AI bị bias, tester kiểm tra và yêu cầu AI ra soát, bổ sung thêm
- Câu trả lời của AI chưa hoàn toàn đầy đủ. Khi đi vào bước tiếp theo, AI lại bổ sung và phải chỉnh sửa lại các bước trước, và nó không được đồng nhất. Tester phải kiểm tra, chỉnh sửa lại các phần đã làm. Việt này xảy ra là do những chỉnh sửa này phải ở các bước tiếp theo thì AI mới có thể nhận ra và bổ sung