import Post from "../models/post.model";

export default class PostsController {
  static async getPosts(request, response) {
    // return 200 OK and the response, WITH the likes and comments count !!
    const { caption, hashtag, sortBy } = request.query;
    switch (sortBy) {
      // sort for homepage display
      case 'latest':
        // sorted by date post
        break;

      case 'popular':
        // sorted by a scoring system
        break;

      default:
        // don't sort, filter by caption or ONE hashtag for searching
        break;
    }
  }
 
  static async getPostsById(request, response) {
    // populate comments, likes & shares
    // return 200 OK and the response
    const { postId } = request.params;
    const post = await Post.findById(postId).populate("comment", "like", "share");
    return response.status(200).json(post);
  }

  static async createPost(request, response) {
    // post object contain the author id, caption, mediaURL, privacy and hashtags
    // return 201 Created if success and return the created object
    // return 400 Bad Request if missing values
    try {
      const post = request.body;
      post.userId = request.user.userId;
      post.caption = request.user.caption;
      post.mediaURL = request.user.mediaURL;
      post.privacy = request.user.privacy;
      post.hashtags = request.user.hashtags;
      await Post.create(post);
      return response.status(201).json(post);
    } catch (error) {
      return 400;
    }
  }

  static async updatePostsById(request, response) {
    // post object contain the author id, caption, mediaURL, privacy and hashtags
    // return 200 OK and the response
    // return 400 Bad Request if values is invalid
    try{
      const { postId } = request.params;
      const post = request.body;
      await Post.updateMany({
        userId: request.userId,
        caption: request.caption,
        mediaURL: request.mediaURL,
        privacy: request.privacy,
        hashtags: request.hashtags
      },
      {
        where: {
          username: request.username
        }
      });
      return response.status(200).json(post);

  } catch (error) {
    return 400;
  }
}

  static async deletePostsById(request, response) {
    // remember to delete all the comments inside
    // ALWAY return 204 No Content
    // return 400 Bad Request if values is invalid
    try{
      const { postId } = request.params;
      await Post.destroy({
        where: {
          id: postId,
        }
      });
    } catch (error) {
      return 400;
    }
  }
}
