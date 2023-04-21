export default class CommentsController {
  static async getCommentsByPostId(request, response) {
    // return 200 OK and the data
    // return 400 Bad Request if post not found
    const { postId } = request.params;
    try {
      const comments = await Comment.find({ postId: postId }); // Truy vấn các bình luận với postId được cung cấp
      response.json(comments); // Trả về các bình luận dưới dạng JSON
  } catch (error) {
      response.status(400).json({ error: "Bad Request" }); // Trả về thông báo lỗi với mã trạng thái 400
  }
  }

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

    // Tạo mới comment và thêm vào danh sách bình luận của bài viết
    const newComment = await Comment.create(comment);
    await Post.updateOne({ _id: postId }, { $push: { comments: newComment._id } });

    return response.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Something went wrong" });
  }
  }

  static async updateCommentsById(request, response) {
    // return 200 OK if success and return the created object
    // return 400 Bad Request if missing values
    const { postId, commentId } = request.params;
    const comment = request.body;

    //Cập nhập một bình luận
    try {
      const updatedComment = await Comment.findOneAndUpdate(
        { _id: commentId, post: postId },
        { text: comment.text },
        { new: true }
      );
  
      if (!comment) {
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
    const { postId, commentId } = request.params;

    //Xóa một bình luận
    try {
      const comment = await Comment.findOneAndDelete({ _id: commentId, postId: postId });
      if (!comment) {
        return response.status(400).send({ message: "Bad Request" });
      }
      return response.status(204).send({ message: "No Content" });
    } catch (error) {
      console.error(error);
      return response.status(500).send({ message: "Something went wrong" });
    }
  } 
}
