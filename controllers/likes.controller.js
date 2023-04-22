export default class LikesController {
  static async addLike(request, response) {
    // return 200 OK if success, 409 Conflict if user has already like the post
    const { postId } = request.params;
    const { userId } = request.body;

    try {
      //Kiểm tra bài post có tồn tại hay không
      const post = await Post.findById(postId);
      if (!post) {
        return response.status(404).json({ error: "Post not found" });
      }
  
      // Kiểm tra nếu người dùng đã like bài viết đó
      if (post.likes.includes(userId)) {
        return response.status(409).json({ error: "User already liked this post" });
      }
      
      //Lưu ID người dùng like bài post
      post.likes.push(userId);
      await post.save();
  
      return response.status(200).json({message: "Liked success"});
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Something went wrong" });
    }
  }

  static async removeLike(request, response) {
    // ALWAY return 204 No Content
    // return 400 Bad Request if values is invalid
    const { postId } = request.params;
    const { userId } = request.body;

    try {
      const post = await Post.findById(commentId);
      if (!post) {
        return response.status(404).json({ error: "Post not found" });
      }
      
      // Kiểm tra nếu người dùng chưa like bài viết đó
      if (!Post.likes.includes(userId)) {
        return response.status(400).json({ error: "Values is invalid" });
      }

      // Tìm và xóa user id khỏi danh sách likes
      post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
      await post.save();
  
      return response.status(204).json({message: "No Content"});
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Something went wrong" });
    }
  }
}
