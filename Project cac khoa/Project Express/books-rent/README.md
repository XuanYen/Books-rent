# Project manage books v2.4
## What to do
Khi code server của bạn có lỗi gì đó như truy cập một property nào đó của một giá trị undefined, nó sẽ throw lỗi và server sẽ tự động render trang error cho status 500.
1) Thử viết đoạn code sau vào một controller bất kì var a; a.b();
2) Mở route tương ứng trên trình duyệt xem lỗi ra sao
3) Viết 1 trang hiển thị lỗi 500 một cách đẹp mắt hơn

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
  Một ngày, bạn gái bạn qua nhà chơi và nhận thấy hệ thống bạn đang làm thật là awesome, cô ấy khuyên bạn nên làm chứng năng đăng nhập để những người thuê sách có thể quản lý được những cuốn sách mà họ thuê của bạn.
15) Áp dụng kiến thức đã học làm chức năng đăng nhập
16) Tạo thêm 1 field password cho mỗi user và đặt giá trị string "123123" cho tất cả user để tăng tính bảo mật (bạn đã từng nghe: nơi nguy hiểm nhất là nơi an toàn nhất? Biết đâu các hacker chỉ dò các password có độ dài 8 ký tự trở lên? App của bạn là một trường hợp ngoại lệ)
17) Thêm trường email cho mỗi người dùng, đảm bảo tính unique (đây là thời điểm để bạn sáng tạo)
18) Làm sao để mỗi người đăng nhập vào hệ thống thì nhìn thấy menu Transactions ngoại trừ account của bạn, và trong đó chỉ chứa các transaction liên quan tới user đang đăng nhập
Gợi ý: Bạn nên thêm 1 field isAdmin: true cho tài khoản của bạn. Bài này bạn sẽ phải nghĩ nhiều hơn các bài khác một chút. Hãy dành 1 ngày ra làm trước khi bạn hỏi trợ giúp.
19) Vào một ngày mưa gió bão bùng, chớp giật ngoài hiên, bạn gái của bạn qua nhà chơi và hack vào hệ thống của bạn vì cô ấy nhìn lén được mật khẩu của người dùng. Bạn quyết định mã hoá chúng để cho dù cô ấy có lấy được database cũng không thể dò được mật khẩu là bao nhiêu.
Dùng md5
Người tính không bằng trời tính. Bạn gái của bạn thông minh hơn bạn tưởng. Cô ấy không thèm hack db của bạn, mà cô ấy sử dụng brute-force để dò ra mật khẩu của bạn (sau khi đã dòm được email đăng nhập của bạn).
Bạn nhận ra rằng, thuật toán của md5 khá là cùi bắp vì nó chạy nhanh -> chỉ cần ít phút để có thể brute-force ra kết quả.
Một lý do nữa là bạn quên implement rate limiter để tránh bị brute-force nữa.
20) Sử dụng bcrypt để hash password của người dùng (google trước đã nhé)
21) Lưu lại số lần login sai của 1 người dùng vào field wrongLoginCount để nếu họ nhập sai lần thứ 4 trở đi, hệ thống sẽ không check hash nữa mà báo lỗi luôn (cái này không phải là rate limit)
22) Thực hiện sign cho cookie
Bạn nhận thấy app của mình không thể kiếm được tiền cho không có một tính năng gì đặc biệt. Tất cả những tính năng bạn đang làm bất cứ beginner nào cũng có thể làm được. Bạn ngồi vò đầu bứt tai suốt 1 tuần liền thì tự dưng bạn nghĩ ra: Nếu ta gửi mail cho người dùng khi tài khoản của họ bị login sai 3 lần liên tiếp thì họ sẽ vui sướng tới mức móc tiền ra trả để được sử dụng dịch vụ vì hệ thống của bạn bảo mật quá tốt.
23) Đăng ký sử dụng một email API : nodemailer
24) Bỗng dưng app của bạn được nhiều người dùng, tiếng lành đồn xa tới tai một nhà báo lá cải nghiệp dư tên Thông, anh ta quyết định tới gặp bạn để viết bài đăng lên blog của anh.
Sau một ngày, lượng người đến nhà bạn thuê sách quá nhiều, dẫn đến trang web của bạn bị giật lag do danh sách user và transaction quá dài.
Bạn quyết định implement chức năng pagination để giảm tải cho cả server lẫn trình duyệt.
Khách hàng bắt đầu than phiền vì họ không được up avatar. Bạn quyết định làm tính năng upload avatar cho user.
Bạn nghe những người xung quanh đồn thổi về một dịch vụ up ảnh lên cloud gọi là Cloudinary. Bạn quyết định đăng ký tài khoản và dùng thử nó.
Nó có hỗ trợ API cho Node để có thể tải ảnh lên.
25) Hãy làm một trang update profile cho user của bạn /profile, trong đó có form update thông tin người dùng, avatar hiện tại (nếu không có thì hiển thị 1 default avatar, bạn có thể tìm trên google image cả lố) và một đường link dẫn tới trang update avatar /profile/avatar.
26) Trang update avatar có chứa avatar hiện tại và 1 form có file input để upload avatar mới, kèm theo nút Submit.
27) Khi submit, file sẽ được gửi lên server, sau đó server sẽ upload lên Cloudinary (để tránh bị lộ service đang được dùng cho user, thêm nữa trong tương lai bạn có đổi dịch vụ không dùng Cloudinary nữa thì không phải update lại code phía client).
Bạn lưu đường dẫn trả về từ Cloudinary vào 1 field avatarUrl
Một ngày nọ, bạn có kèo thơm với một công ty chuyển phát, bạn quyết định cho mọi người thuê online.
Sau 1 tháng hoạt động, mở Google Analytics bạn nhận thấy nhiều người dùng mở trang web của bạn ra sau đó bỏ đi (bounce rate cao), bạn nhận ra rằng, yêu cầu người dùng luôn phải đăng nhập là một UX tồi.
Bạn quyết định biến trang /books thành một trang không cần đăng nhập để người dùng có thể tự do xem bạn có sách gì để thuê, khi họ thấy hứng thú thì họ mới quyết định tạo tài khoản.
28) Biến trang /books thành public
29) Tạo bìa sách cho mỗi cuốn sách (gợi ý: coverUrl, dùng file upload)
30) Làm chức năng thêm sách vào giỏ trước khi đăng nhập và giữ nguyên trong giỏ sau khi đã đăng nhập
31) Nút thuê sách khi ấn vào thì toàn bộ sách sẽ được chuyển thành các transaction
32) Áp dụng kiến thức đã học để chuyển sang dùng MongoDB + mongoose thay vì lowdb.
33) Sau khi đã chạy bản web một thời gian, bạn nghĩ đến việc làm app cho mobile, bạn thuê được một anh chàng làm mobile từ Silicon Valley, bạn đảm nhận phần REST API.
Hai bên lên plan và quyết định chỉ làm 2 tính năng: đăng nhập + xem các transaction.
Áp dụng kiến thức đã học ở bài REST API để tạo ra các endpoint sau:
POST /api/login
GET /api/transactions
34) Bạn quyết định làm đầy đủ chức năng cho mobile app
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