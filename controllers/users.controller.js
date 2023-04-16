import userSchema from "../models/user.model.js";
export default class UsersController {
  static async getUsers(request, response) {
    // allow to filter by queries
    // return 200 OK and the response
    const { firstName, lastName, username, email, phone } = request.query;
    const filter={};
    if (request.query){
      if("firstName" in request.query)
        filter.firstName = request.query.firstName;
      if("lastName" in request.query)
        filter.lastName = request.query.lastName;
      if("username" in request.query)
        filter.username = request.query.username;
      if("email" in request.query)
        filter.email = request.query.email;
      if("phone" in request.query)
        filter.phone = request.query.phone;
    }
    try{
      const user= await userSchema.find(filter);
      response.status(200).json(user);
    } catch (err){
      response.status(500).send(err.message);
    }
  }

  static async getUsersById(request, response) {
    // populate friendsList & posts
    // return 200 OK and the response
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
