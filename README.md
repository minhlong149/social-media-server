# Social Media Server

Máy chủ truy vấn trả về dữ liệu thông qua các REST API. *Đây là
[một phần](https://github.com/minhlong149/social-media-client) đồ án xây dựng trang mạng xã
hội cho môn học Kỹ thuật phát triển hệ thống Web của nhóm sinh viên trường Đại học Công nghệ Thông
tin - ĐHQG TP.HCM.*

- [Social Media Server](#social-media-server)
  - [Yêu cầu chức năng](#yêu-cầu-chức-năng)
    - [Tạo tài khoản mới và đăng nhập](#tạo-tài-khoản-mới-và-đăng-nhập)
    - [Hiển thị thông tin trang cá nhân](#hiển-thị-thông-tin-trang-cá-nhân)
    - [Xem bài viết trên trang chủ](#xem-bài-viết-trên-trang-chủ)
    - [Các yêu cầu khác](#các-yêu-cầu-khác)
  - [Kiến trúc hệ thống](#kiến-trúc-hệ-thống)
  - [Thiết kế API](#thiết-kế-api)
  - [Hướng dẫn cài đặt](#hướng-dẫn-cài-đặt)
  - [Tác giả](#tác-giả)

## Yêu cầu chức năng

### Tạo tài khoản mới và đăng nhập

- Người dùng có thể **tạo tài khoản** với tên đăng nhập/email/số điện thoại, mật khẩu cùng với các
  thông tin cá nhân khác (tên, ngày sinh, giới tính và địa chỉ). Không cho phép tạo tài khoản nếu
  tên đăng nhập/email/số điện thoại đã bị trùng.
- Người dùng có thể **đăng nhập** với tên đăng nhập/email/số điện thoại và mật khẩu cho tài khoản
  của mình. Thông tin đăng nhập phải được lưu lại kể cả khi người dùng tải lại trang.

### Hiển thị thông tin trang cá nhân

- Người dùng có thể **chỉnh sửa thông tin cá nhân** của mình như tên, ngày sinh, giới tính và địa
  chỉ.
- Người dùng có thể **tạo, chỉnh sửa và xóa bài viết** của mình. Thông tin bài viết bao gồm chế độ
  hiển thị, nội dung và cũng CÓ THỂ đính kèm hình ảnh. Bài viết sau khi xóa cũng sẽ xóa đi mọi bình
  luận bên trong nó.
- Người dùng có thể xem thông tin cá nhân, danh sách bạn bè và bài viết của họ (hoặc BẠN BÈ của họ)
  tại **trang cá nhân** của người đó.

### Xem bài viết trên trang chủ

- Người dùng có thể xem bài viết của bạn bè (tại trang chủ hoặc trang cá nhân của họ) được **sắp xếp
  theo MỚI NHẤT hoặc PHỔ BIẾN NHẤT**. Thông tin hiển thị bao gồm tên người đăng, thời gian, nội dung
  tóm tắt bài viết và số lượt tương tác.
- Khi ấn vào một bài viết trên trang chủ, người dùng có thể xem chi tiết nội dung bài viết cùng với
  lượt bình luận.
- Người dùng có thể **thích** hoặc hủy thích bài viết trên trang chủ hoặc của bạn bè. Lưu ý hiển thị
  trạng thái đã thích cho các bài viết (kể cả khi khởi động lại trang)
- Người dùng có thể **bình luận** trên bài viết trên trang chủ hoặc của bạn bè, chỉnh sửa hoặc xóa
  bình luận của họ. Người dùng cũng có thể **trả lời một bình luận**, chỉnh sửa hoặc xóa trả lời đó.

### Các yêu cầu khác

- Người dùng có thể **tìm kiếm** một người hay bài viết với nhiều bộ lọc khác nhau.
- Người dùng có thể gửi **lời mời kết bạn** và chấp nhận lời mời kết bạn từ các tài khoản khác.

## Kiến trúc hệ thống

Máy chủ được xây dựng bằng `Node.js` và `Express` sẽ cung cấp các API cho máy khách để thực hiện các
chức năng như đăng ký, đăng nhập, đăng bài viết, thích, bình luận, kết bạn và tìm kiếm. Thông tin về
người dùng và bài viết sẽ được lưu trữ trong cơ sở dữ liệu `MongoDB` và `AWS S3`.

![MERN-stack Architecture](https://webassets.mongodb.com/_com_assets/cms/MEAN_stack-0pdlo3qwbn.png)

## Thiết kế API

| Phương thức | Đường dẫn                                 | Chức năng                                                          |
| ----------- | ----------------------------------------- | ------------------------------------------------------------------ |
| POST        | api/login                                 | Đăng nhập, trả về token cho người dùng                             |
| GET         | api/users                                 | Lấy danh sách thông tin người dùng khi cần tìm kiếm                |
| GET         | api/users/`:userId`                       | Lấy thông tin của người dùng đễ hiển thị lên trang cá nhân         |
| POST        | api/users                                 | Đăng ký tạo tài khoản mới                                          |
| PUT         | api/users/`:userId`                       | Sửa thông tin người dùng trong phần cài đặt                        |
| DELETE      | api/users/`:userId`                       | Xóa người dùng trong phần cài đặt                                  |
| GET         | api/users/`:userId`/friends               | Lấy danh sách bạn bè của một người dùng (cho trang cá nhân của họ) |
| GET         | api/users/`:userId`/friendsOfFriends      | Lấy danh sách bạn bè của bạn bè của một người dùng                 |
| POST        | api/users/`:userId`/friends               | Gửi lời mời kết bạn đến 1 người dùng                               |
| PUT         | api/users/`:userId`/friends/`:friendId`   | Đồng ý lời mời kết bạn                                             |
| DELETE      | api/users/`:userId`/friends/`:friendId`   | Xóa bạn bè, từ chối lời mời kết bạn                                |
| GET         | api/posts                                 | Lấy thông tin danh sách bài viết để hiển thị lên trang chủ         |
| GET         | api/posts/`:postId`                       | Lấy thông tin chi của một bài viết                                 |
| POST        | api/posts                                 | Tạo bài viết mới                                                   |
| PUT         | api/posts/`:postId`                       | Sửa nội dung bài viết                                              |
| DELETE      | api/posts/`:postId`                       | Xóa bài viết + toàn bộ bình luận bên trong                         |
| POST        | api/posts/`:postId`/likes/                | Người dùng thích bài viết                                          |
| DELETE      | api/posts/`:postId`/likes/`:userId`       | Người dùng hủy thích bài viết                                      |
| GET         | api/posts/`:postId`/comments              | Lấy toàn bộ bình luận (cả phần trả lời) của một bài viết           |
| POST        | api/posts/`:postId`/comments              | Thêm bình luận mới.                                                |
| PUT         | api/posts/`:postId`/comments/`:commentId` | Sửa nội dung bình luận                                             |
| DELETE      | api/posts/`:postId`/comments/`:commentId` | Xóa bình luận + phần trả lời                                       |
| GET         | images/`:imageId`                          | Hiển thị hình ảnh bài viết                                         |

## Hướng dẫn cài đặt

- Clone repo này về máy và cài các gói package bằng lệnh `npm install`. *Yêu cầu sử dụng Node.js
  phiên bản từ **18.12.0 trở lên**.*

- Thêm các biến môi trường `PORT`, `MONGODB_URI`, `JWT_ACCESS_KEY` vào tập tin `.env`.

- Khởi động máy chủ thông qua lệnh `node index.js`.

> Để có thể sử dụng chức năng đăng ảnh, tạo một bucket trên AWS S3 và thêm vào tập tin `.env` các
> biến `AWS_S3_BUCKET`, `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` và
> `AWS_SESSION_TOKEN`.

## Tác giả

- [Nguyễn Đào Minh Long](https://github.com/minhlong149)
- [Trần Trọng Nguyên](https://github.com/Norman-Tran)
- [Quách Kiều Oanh](https://github.com/Qanh195)
- [Lưu Chí Thịnh](https://github.com/Thinh446274)
- [Lương Phúc Vinh](https://github.com/vinhlp02)
- [Mai Ngọc Bích](https://github.com/bichmn)
- [Lê Nguyễn Bá Duy](https://github.com/ZuyLeLe)
