import postSchema from "../models/post.model.js"
export default class PostsController {
  static async getPosts(request, response) {
    // return 200 OK and the response, WITH the likes and comments count !!
    const { caption, hashtag, sortBy } = request.query;
    let post;
    switch (sortBy) {
      // sort for homepage display
      case 'latest':
        // sorted by date post
        var latest = {timestamps : -1}
        post = await postSchema.sort(latest);
        break;

      case 'popular':
        // sorted by a scoring system

        break;

      default:
        // don't sort, filter by caption or ONE hashtag for searching
        const filter ={};
        if(request.query.caption)
          filter.caption = request.query.caption;
          else if(request.query.hashtag)
                filter.hashtag = request.query.hashtag;
                
        post = await postSchema.find(filter).sort({timestamps: -1});
        break;

    }
          
    try {
      const postList = await post.toArray();
      response.status(200).json(postList);
    } 
    catch (err){
        throw err;
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
