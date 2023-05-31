import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import { addNotification } from '../utils/notifications.js';

export default class CommentsController {
  static async getCommentsByPostId(request, response) {
    // return 200 OK and the data
    // return 400 Bad Request if post not found
    const { postId } = request.params;
  }
  //Ps: Trong posts.route, có phương thức getCommentsByPostId nên để phương thức này trống, nếu có thì server báo lỗi.

  static async addComments(request, response) {
    // comment object contain the info needed (can destructuring if want to)
    // return 201 Created if success and return the created object
    // return 400 Bad Request if missing values
    try {
      const { postId } = request.params;
      const comment = request.body;

    // Kiểm tra comment có đủ thông tin hay không
    if (!comment || !comment.text || !comment.userId) {
      return response.status(400).json({ error: "Bad Request" });
    }

    // Tạo mới comment
    const newComment = await Comment.create(comment);

    // Tìm post theo id 
    const post = await Post.findById(postId);

    if (!post) {
      return response.status(404).json({ error: "Post not found" });
    }

    //Lưu comment mới tạo vào danh sách comment của bài post
    post.comments.push(newComment.id);
    await post.save();

    await addNotification(
      new Notification({
        user: post.author,
        type: 'comment',
        target: post.id,
        targetModel: 'Post',
      }),
    );
  
    return response.status(201).json(newComment);
    } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Something went wrong" });
    }
  }

  static async updateCommentsById(request, response) {
    try {
      // return 200 OK if success and return the created object
      // return 400 Bad Request if missing values
      const { postId, commentId } = request.params;
      const comment = request.body;

      
      //Cập nhập một bình luận
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { text: comment.text },
        { new: true }
      );

      // Kiểm tra comment
      if (!updatedComment) {
        return response.status(400).json({ error: "Bad Request" });
      }


      return response.status(200).json(updatedComment);
    } catch (error) {
      return response.status(500).json({ error: "Something went wrong" });
    }
  }

  static async deleteCommentsById(request, response) {
    // ALWAY return 204 No Content
    // return 400 Bad Request if values is invalid/not found

    try {
      const { postId, commentId } = request.params;

      //Xóa một bình luận
      const comment = await Comment.findById(commentId);
      await comment.deleteOne();
      if (!comment) {
        return response.status(400).send({ message: "Bad Request" });
      }

      //Tìm lại thông tin bài post chứa bình luận 
      const post = await Post.findById(postId);
      if (!post) {
        return response.status(404).json({ error: "Post not found" });
      }

      //Xóa id của bình luận trong bài viết sau khi xóa bình luận
      post.comments.pull(commentId);
      await post.save();

      return response.status(204).send({ message: "No Content" });
    } catch (error) {
      console.error(error);
      return response.status(500).send({ message: "Something went wrong" });
    }
  } 
}