import Post from '../models/post.model.js';
import User from '../models/user.model.js';

export default class PostsController {
  static async getPosts(request, response) {
    const { caption, hashtag, sortBy } = request.query;
    const { userID } = request.body;

    try {
      const currentUser = await User.findById(userID);
      const userFriendsIds = currentUser.friendsList.map((friend) => friend.userId);

      // TODO: Check if user ID is valid (found in DB)

      switch (sortBy) {
        case 'latest':
          const postedByUser = { author: currentUser.id };
          const postedByUserFriends = { author: { $in: userFriendsIds } };

          const latestPosts = await Post.find()
            .or([postedByUser, postedByUserFriends])
            .sort({ createdAt: -1 });

          response.json(latestPosts);
          break;

        case 'popular':
        // sorted by a scoring system

        default:
        // don't sort, filter by caption or ONE hashtag for searching
      
      }
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }

  static async getPostsById(request, response) {
    // populate comments, likes & shares
    // return 200 OK and the response
    const { postId } = request.params;
  }

  static async createPost(request, response) {
    // post object contain the author id, caption, mediaURL, privacy and hashtags
    // return 201 Created if success and return the created object
    // return 400 Bad Request if missing values
    const post = request.body;
  }

  static async updatePostsById(request, response) {
    // post object contain the author id, caption, mediaURL, privacy and hashtags
    // return 200 OK and the response
    // return 400 Bad Request if values is invalid
    const { postId } = request.params;
    const post = request.body;
  }

  static async deletePostsById(request, response) {
    // remember to delete all the comments inside
    // ALWAY return 204 No Content
    // return 400 Bad Request if values is invalid
    const { postId } = request.params;
  }
}
