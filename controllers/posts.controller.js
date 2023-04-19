import Post from '../models/post.model.js';
import User from '../models/user.model.js';
export default class PostsController {
  static async getPosts(request, response) {
    // return 200 OK and the response, WITH the likes and comments count !!
    const { caption, hashtag, sortBy } = request.query;
    //Lấy tất cả các bài viết của bạn bè và của chính mình.
    const currentUser = await User.findById(request.body.id); 
    const userPosts = await Post.find({ author: currentUser.id });
    const friendPosts = await Promise.all(
      currentUser.friendsList.map((userId) => {
        return Post.find({ author: userId });
      }) 
    );
    const postsGetDefault = userPosts.concat(...friendPosts);
    let postsList;
    switch (sortBy) {
      // sort for homepage display
      case 'latest':
        // sorted by date post
        var latest = { timestamps: -1 };
        postsList = postsGetDefault.sort(latest);
        break;

      case 'popular':
        // sorted by a scoring system
        //Tính điểm để sắp xếp theo độ phổ biên
       const posts = await Promise.all(
         postsGetDefault.map(async (post) => {
           const populatedPost = await Post.findById(post.id)
             .populate('likes')
             //.populate('comments')
             .populate('shares');
           return {
             post: populatedPost,
             points:
               populatedPost.likes.length +
               //populatedPost.comments.length * 2 +
               populatedPost.shares.length * 3,
           };
         }),
       );
        postsList = posts.sort((a, b) => b.points - a.points);
        break;

      default:
        // don't sort, filter by caption or ONE hashtag for searching
        if (caption) {
          postsList = postsGetDefault.filter(post => post.caption.includes(caption));
        }
        else if (hashtag) {
          postsList = postsGetDefault.filter((post) => post.hashtags.includes(hashtag));
        } else postsList = postsGetDefault;
        break;
    }
    try {
      response.status(200).json(postsList);
    }
    catch (err) {
      response.status(500).json(err);
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
