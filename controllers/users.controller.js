export default class UsersController {
  static async getUsers(request, response) {
    // allow to filter by queries
    // return 200 OK and the response
    const { firstName, lastName, username, email, phone } = request.query;
  }

  static async getUsersById(request, response) {
    // populate friendsList & posts
    // return 200 OK and the response
    //Oanh
    const { userId } = request.params;
  }

  static async createUser(request, response) {
    // user object contain the credential and basic profile info
    // return 201 Created if success and return the created object
    // return 400 Bad Request if missing values
    const user = request.body;
  }

  static async login(request, response) {
    // return 200 OK if success and return a token
    // return 401 Unauthorized if credential invalid
    const { username, email, phone, password } = request.body;
  }

  static async updateUsersById(request, response) {
    // user object contain the credential and basic profile info
    // return 200 OK and the response
    // return 400 Bad Request if values is invalid
    const { userId } = request.params;
    const user = request.body;
  }

  static async deleteUsersById(request, response) {
    // ALWAY return 204 No Content
    // return 400 Bad Request if values is invalid
    const { userId } = request.params;
  }
}
