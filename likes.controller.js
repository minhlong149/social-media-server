export default class LikesController {
  static async addLike(request, response) {
    // return 200 OK if success, 409 Conflict if user has already like the post
    const { postId } = request.params;
    const { userId } = request.body;

    try {
      const comment = await Comment.findById(commentId);
  
      if (!comment) {
        return response.status(404).json({ error: "Comment not found" });
      }
  
      // Kiểm tra nếu người dùng đã like bài viết đó
      if (comment.likes.includes(userId)) {
        return response.status(409).json({ error: "User already liked this comment" });
      }
  
      comment.likes.push(userId);
      await comment.save();
  
      return response.status(200).json({message: "Liked success"});
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Something went wrong" });
    }
  }

  static async removeLike(request, response) {
    // ALWAY return 204 No Content
    // return 400 Bad Request if values is invalid
    const { postId, userId } = request.params;

    try {
      const comment = await CommentModel.findById(commentId);
  
      if (!comment) {
        return response.status(404).json({ error: "Comment not found" });
      }
      
      // Kiểm tra nếu người dùng chưa like bài viết đó
      if (!comment.likes.includes(userId)) {
        return response.status(400).json({ error: "Values is invalid" });
      }
  
      comment.likes.pull(userId);
      await comment.save();
  
      return response.status(204).json({message: "No Content"});
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Something went wrong" });
    }
  }
}
