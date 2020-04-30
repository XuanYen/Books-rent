# Project manage books v1.5
## What to do
Một ngày, bạn gái bạn qua nhà chơi và nhận thấy hệ thống bạn đang làm thật là awesome, cô ấy khuyên bạn nên làm chứng năng đăng nhập để những người thuê sách có thể quản lý được những cuốn sách mà họ thuê của bạn.
1) Áp dụng kiến thức đã học làm chức năng đăng nhập
2) Tạo thêm 1 field password cho mỗi user và đặt giá trị string "123123" cho tất cả user để tăng tính bảo mật (bạn đã từng nghe: nơi nguy hiểm nhất là nơi an toàn nhất? Biết đâu các hacker chỉ dò các password có độ dài 8 ký tự trở lên? App của bạn là một trường hợp ngoại lệ)
3) Thêm trường email cho mỗi người dùng, đảm bảo tính unique (đây là thời điểm để bạn sáng tạo)
4) Làm sao để mỗi người đăng nhập vào hệ thống thì nhìn thấy menu Transactions ngoại trừ account của bạn, và trong đó chỉ chứa các transaction liên quan tới user đang đăng nhập

Gợi ý: Bạn nên thêm 1 field isAdmin: true cho tài khoản của bạn. Bài này bạn sẽ phải nghĩ nhiều hơn các bài khác một chút. Hãy dành 1 ngày ra làm trước khi bạn hỏi trợ giúp.
## What I did
1) Tạo một trang quản lý sách mà bạn có (route /books)
2) Đảm bảo có đủ chức năng:

- Hiển thị toàn bộ sách đang có (danh sách các title)
- Thêm sách (chỉ cần field title - tiêu đề sách, description - mô tả sách)
- Update tiêu đề sách
- Xoá sách
Chú ý: Sử dụng lowdb
3) Tưởng tượng bạn có quá nhiều sách đến nỗi bạn muốn cho người khác thuê. Bây giờ bạn cần: Thêm chức năng CRUD users (thêm bớt sửa xoá), users ở đây là những người thuê sách
4) Sử dụng route /users
Bạn chợt nhận ra là giả sử bây giờ có một người đến thuê, làm thế nào để biết ai đang thuê cuốn nào? Bạn cần phải có thêm 1 collection chứa các transaction của việc thuê sách. Mỗi object trong collection này sẽ chứa: userId, bookId, tất nhiên chúng sẽ có 1 property id riêng của mình.
5) Update lại file db json của bạn
6) Thêm route /transactions hiển thị các transactions đã tạo. 
7) Thêm trạng /transactions/create chứa form gồm 2 field là 2 dropdown (sử dụng select và option để giải quyết). Một dropdown dành cho các user, 1 dropdown dành cho việc chọn sách. Đừng quên nút Create để tạo mới.
8) Action của form trên có thể để /transactions/create (hoặc để trống sẽ tự hiểu là POST lên URL hiện tại) và method là POST (of course)
Bạn chợt nhận ra khi một người trả sách cho mình, mình không biết làm sao để đánh dấu là transaction đã được hoàn thành. Bạn bèn nghĩ ra việc thêm 1 field mới cho mỗi transaction là isComplete (boolean) nếu nó là true thì có nghĩa là transaction đã hoàn thành, sách đã được trả.
9) Thêm một link Hoàn thành ở mỗi transaction ở màn hình /transactions
10) Link này trỏ tới /transactions/<id>/complete trong đó <id> đại diện cho ID của transaction ở dòng đó
11) Bạn tự hiểu logic phải làm gì rồi đúng không?
12) Them template layout
13) Validate user input
14) Chuyen validate sang middleware
# hello-express

A server that serves a webpage, its resources, and some data


## Your Project

On the front-end,

- Edit `views/index.html` to change the content of the webpage
- `public/client.js` is the javacript that runs when you load the webpage
- `public/style.css` is the styles for `views/index.html`
- Drag in `assets`, like images or music, to add them to your project

On the back-end,

- your app starts at `server.js`
- add frameworks and packages in `package.json`
- safely store app secrets in `.env` (nobody can see this but you and people you invite)

Click `Show` in the header to see your app live. Updates to your code will instantly deploy.


## Made by [Glitch](https://glitch.com/)

**Glitch** is the friendly community where you'll build the app of your dreams. Glitch lets you instantly create, remix, edit, and host an app, bot or site, and you can invite collaborators or helpers to simultaneously edit code with you.

Find out more [about Glitch](https://glitch.com/about).

( ᵔ ᴥ ᵔ )