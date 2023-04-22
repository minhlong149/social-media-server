import Post from "../models/post.model.js";
import User from "../models/user.model.js";

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
    try {
      const { postId } = request.params;
      const post = await Post.findById(postId);
      response.status(200).json(post);
    } catch(error) {
      response.status(500).json(error.message);
    }
  }

  static async createPost(request, response) {
    // post object contain the author id, caption, mediaURL, privacy and hashtags
    // return 201 Created if success and return the created object
    // return 400 Bad Request if missing values
      const post = request.body;
      const newPost = await Post(post);
      try {
        const savedPost = await newPost.save();
        response.status(201).json(savedPost);
      } catch (error) {
        response.status(500).json(error);
      }

      
}

  static async updatePostsById(request, response) {
    // post object contain the author id, caption, mediaURL, privacy and hashtags
    // return 200 OK and the response
    // return 400 Bad Request if values is invalid
    try{
      const { postId } = request.params;
      const post = await Post.findById(postId);
        await post.updateOne({$set: request.body});
        response.status(200).json("OK");

  } catch (error) {
    response.status(400).json("values is invalid");
  }
}

  static async deletePostsById(request, response) {
    // remember to delete all the comments inside
    // ALWAY return 204 No Content
    // return 400 Bad Request if values is invalid
    try{
      const { postId } = request.params;
      const post = await Post.findById(postId);
        await post.deleteOne();
        response.status(204).json("No Content");
    } catch (error) {
      response.status(400).json("values is invalid");
    }
  }
}
