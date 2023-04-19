import Post from '../models/post.model.js';
import User from '../models/user.model.js';

export default class PostsController {
  static async getPosts(request, response) {
    const { caption, hashtag, sortBy } = request.query;
    const { userID } = request.body;

    try {

      const currentUser = await User.findById(userID);
      const userFriendsIds = currentUser.friendsList.map((friend) => friend);

      // TODO: Check if user ID is valid (found in DB)
      //Kiểm tra có đang là bạn bè hay không?
      const friendsList = userFriendsIds.filter(friend => friend.status.includes("accepted")).map(friend => friend.userId);
      //Tất cả các user(bao gồm người dùng hiện tại và bạn bè).
      const allIds = [currentUser.id, ...friendsList];

      switch (sortBy) {
        case 'latest':
          //Kiểm tra các bài post có author nằm trong danh sách user và sắp xếp theo ngày đăng gần nhất.
          const latestPosts = await Post.find({ author: { $in: allIds } })
            .sort({ createdAt: -1 });

          let res = {
            posts: latestPosts,
            total: latestPosts.length,
          };
          response.json(res);
          break;

        case 'popular':
          // sorted by a scoring system
          const popularPosts = (await Post.find({ author: { $in: allIds } })).map((post) => {
            return {
              posts: post,
              score: post.likes.length +
                post.comments.length * 2 +
                post.shares.length * 3,
            }
          });
          popularPosts.sort((a, b) => b.score - a.score);
          response.json(popularPosts);
        default:
          // don't sort, filter by caption or ONE hashtag for searching
          let postsList = await Post.find({ author: { $in: allIds } });
          if (caption) {
            postsList = postsList.filter((post) => post.caption.includes(caption));
          }
          else if (hashtag) {
            postsList = postsList.filter((post) => post.hashtags.includes(hashtag));
          }
          response.json(postsList);
          break;
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
