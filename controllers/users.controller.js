import userSchema from "../models/user.model.js";
export default class UsersController {
  static async getUsers(request, response) {
    // allow to filter by queries
    // return 200 OK and the response
    const { firstName, lastName, username, email, phone } = request.query;
    const filter={};
    if (request.query.firstName)
        filter.firstName = request.query.firstName;
      else if(request.query.lastName)
              request.query.lastName;
              else if(request.query.username)
                      filter.username = request.query.username;
                      else if(request.query.email)
                              filter.email = request.query.email;
                              else if(request.query.phone)
                                    filter.phone = request.query.phone;
    let cursor;
    try{
      cursor= await userSchema.find(filter);
      const userList = await cursor.toArray();
      response.status(200).json(userList);
    } 
    catch (err){
        throw err;
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
