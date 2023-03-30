# Social media backend server

- [Social media backend server](#social-media-backend-server)
  - [Yêu cầu](#yêu-cầu)
  - [Thiết kế API](#thiết-kế-api)
  - [Hướng dẫn cài đặt](#hướng-dẫn-cài-đặt)

## Yêu cầu

- Người dùng có thể **tạo tài khoản** với tên đăng nhập/email/số điện thoại, mật khẩu cùng với các
  thông tin cá nhân khác (tên, ngày sinh, giới tính và địa chỉ). Không cho phép tạo tài khoản nếu
  tên đăng nhập/email/số điện thoại đã bị trùng.
- Người dùng có thể **đăng nhập** với tên đăng nhập/email/số điện thoại và mật khẩu cho tài khoản
  của mình. Thông tin đăng nhập phải được lưu lại kể cả khi người dùng tải lại trang.
- Người dùng có thể **chỉnh sửa thông tin cá nhân** của mình như tên, ngày sinh, giới tính và địa
  chỉ.
- Người dùng có thể **cập nhập ảnh đại diện** của mình.
- Người dùng có thể **xóa tài khoản** của mình. Mọi bài viết và lượt tương tác liên quan đến tài
  khoản đó cũng sẽ bị xóa đi.
- Người dùng có thể **tạo, chỉnh sửa và xóa bài viết** của mình. Thông tin bài viết bao gồm chế độ
  hiển thị, nội dung và cũng CÓ THỂ đính kèm hình ảnh. Bài viết sau khi xóa cũng sẽ xóa đi mọi bình
  luận bên trong nó.
- Người dùng có thể xem thông tin cá nhân, danh sách bạn bè và bài viết của họ (hoặc BẠN BÈ của họ)
  tại **trang cá nhân** của người đó.
- Người dùng có thể gửi **lời mời kết bạn** và chấp nhận lời mời kết bạn từ các tài khoản khác.
- Người dùng có thể xem bài viết của bạn bè (tại trang chủ hoặc trang cá nhân của họ) được **sắp xếp
  theo MỚI NHẤT hoặc PHỔ BIẾN NHẤT**. Thông tin hiển thị bao gồm tên người đăng, thời gian, nội dung
  tóm tắt bài viết và số lượt tương tác.
- Khi ấn vào một bài viết trên trang chủ, người dùng có thể xem chi tiết nội dung bài viết cùng với
  lượt bình luận.
- Người dùng có thể **thích** hoặc hủy thích bài viết trên trang chủ hoặc của bạn bè. Lưu ý hiển thị
  trạng thái đã thích cho các bài viết (kể cả khi khởi động lại trang)
- Người dùng có thể **bình luận** trên bài viết trên trang chủ hoặc của bạn bè, chỉnh sửa hoặc xóa
  bình luận của họ. Người dùng cũng có thể **trả lời một bình luận**, chỉnh sửa hoặc xóa trả lời đó.
- Người dùng có thể **lưu lại một bài viết** trên trang chủ hoặc của bạn bè. Xem lại các bài viết đã
  lưu tại trang cá nhân của mình. Người khác sẽ không thể thấy được các bài đã lưu. Không cho phép
  lưu trùng bài (hiển thị trạng thái như ở lượt thích)
- Người dùng có thể **tìm kiếm** một người hay bài viết với nhiều bộ lọc khác nhau.

## Thiết kế API

| Phương thức | Đường dẫn                                 | Chức năng                                                          | Phân công |
| ----------- | ----------------------------------------- | ------------------------------------------------------------------ | --------- |
| POST        | api/login                                 | Đăng nhập, trả về token cho người dùng                             | Nguyên    |
| GET         | api/users                                 | Lấy danh sách thông tin người dùng khi cần tìm kiếm                | Oanh      |
| GET         | api/users/`:userId`                       | Lấy thông tin của người dùng đễ hiển thị lên trang cá nhân         | Vinh      |
| POST        | api/users                                 | Đăng ký tạo tài khoản mới                                          | Nguyên    |
| PUT         | api/users/`:userId`                       | Sửa thông tin người dùng trong phần cài đặt                        | Vinh      |
| DELETE      | api/users/`:userId`                       | Xóa người dùng trong phần cài đặt                                  | Vinh      |
| GET         | api/users/`:userId`/friends               | Lấy danh sách bạn bè của một người dùng (cho trang cá nhân của họ) | Duy       |
| GET         | api/users/`:userId`/friendsOfFriends      | Lấy danh sách bạn bè của bạn bè của một người dùng                 | Duy       |
| POST        | api/users/`:userId`/friends               | Gửi lời mời kết bạn đến 1 người dùng                               | Duy       |
| PUT         | api/users/`:userId`/friends/`:friendId`   | Đồng ý lời mời kết bạn                                             | Duy       |
| DELETE      | api/users/`:userId`/friends/`:friendId`   | Xóa bạn bè, từ chối lời mời kết bạn                                | Duy       |
| GET         | api/posts                                 | Lấy thông tin danh sách bài viết để hiển thị lên trang chủ         | Oanh      |
| GET         | api/posts/`:postId`                       | Lấy thông tin chi của một bài viết                                 | Bích      |
| POST        | api/posts                                 | Tạo bài viết mới                                                   | Bích      |
| PUT         | api/posts/`:postId`                       | Sửa nội dung bài viết                                              | Bích      |
| DELETE      | api/posts/`:postId`                       | Xóa bài viết + toàn bộ bình luận bên trong                         | Bích      |
| POST        | api/posts/`:postId`/likes/                | Người dùng thích bài viết                                          | Thịnh     |
| DELETE      | api/posts/`:postId`/likes/`:userId`       | Người dùng hủy thích bài viết                                      | Thịnh     |
| GET         | api/posts/`:postId`/comments              | Lấy toàn bộ bình luận (cả phần trả lời) của một bài viết           | Thịnh     |
| POST        | api/posts/`:postId`/comments              | Thêm bình luận mới.                                                | Thịnh     |
| PUT         | api/posts/`:postId`/comments/`:commentId` | Sửa nội dung bình luận                                             | Thịnh     |
| DELETE      | api/posts/`:postId`/comments/`:commentId` | Xóa bình luận + phần trả lời                                       | Thịnh     |

## Hướng dẫn cài đặt

- Clone repo này về máy và cài các gói package bằng lệnh `npm install`. _Yêu cầu sử dụng Node.js
  phiên bản từ **18.12.0 trở lên**._

- Thêm các biến môi trường `PORT`, `MONGODB_URI` vào tập tin `.env`.

- Khởi động máy chủ thông qua lệnh `npm run dev`.
