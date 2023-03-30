export default class FriendsController {
  static async getFriendsList(request, response) {
    // return 200 OK if success and the response
    // return 400 Bad Request if ID is invalid
    const { userId } = request.params;
    const { pending } = request.query;
  }

  static async sentFriendRequest(request, response) {
    // return 201 Created if success and return YOUR user model
    // return 400 Bad Request if IDs is invalid
    const { userId } = request.params;
    const { friendId } = request.body;
  }

  static async acceptFriendRequest(request, response) {
    // return 200 OK if success and return YOUR user model
    // return 400 Bad Request if IDs is invalid
    const { userId, friendId } = request.params;
  }

  static async removeFriend(request, response) {
    // ALWAY return 204 No Content
    // return 400 Bad Request if IDs is invalid
    const { userId, friendId } = request.params;
  }

  static async getFriendsOfFriends(request, response) {
    // return 200 OK if success and the response
    // return 400 Bad Request if ID is invalid
    const { userId } = request.params;
  }
}
