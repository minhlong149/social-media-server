export default class CommentsController {
  static async getCommentsByPostId(request, response) {
    // return 200 OK and the data
    // return 400 Bad Request if post not found
    const { postId } = request.params;
  }

  static async addComments(request, response) {
    // comment object contain the info needed (can destructuring if want to)
    // return 201 Created if success and return the created object
    // return 400 Bad Request if missing values
    const { postId } = request.params;
    const comment = request.body;
  }

  static async updateCommentsById(request, response) {
    // return 200 OK if success and return the created object
    // return 400 Bad Request if missing values
    const { postId, commentId } = request.params;
    const comment = request.body;
  }

  static async deleteCommentsById(request, response) {
    // ALWAY return 204 No Content
    // return 400 Bad Request if values is invalid/not found
    const { postId, commentId } = request.params;
  }
}
