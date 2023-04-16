const User = require ("../models/user.model");
const jwt = require("jsonwebtoken");

export default class UsersController {
  static async getUsers(request, response) {
    // allow to filter by queries
    // return 200 OK and the response
    const { firstName, lastName, username, email, phone } = request.query;
  }

  static async getUsersById(request, response) {
    // populate friendsList & posts
    // return 200 OK and the response
    const { userId } = request.params;
  }

  static async createUser(request, response) {
    // user object contain the credential and basic profile info
    try {
      // Check credentials information and create user object
      if (!request.body.username || !request.body.email || !request.body.password) {
        // return 400 Bad Request if missing values
        return response.status(400).json({ error: 'Missing required values' });
      }
  
      const newUser = new User ({
        username: request.body.username,
        email: request.body.email,
        phone: request.body.phone,
        password: request.body.password,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        gender: request.body.gender,
        dateOfBirth: request.body.dateOfBirth,
        address: request.body.address,
        avatarURL: request.body.avatarURL,
        friendsList: [],  
      });
  
      const user = await newUser.save();
      // return 201 Created if success and return the created object
      response.status(201).json(user);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async login(request, response) {
    // return 200 OK if success and return a token
    // return 401 Unauthorized if credential invalid
    try {
      const { username, email, phone, password } = request.body;
      const user = await User.findOne({username});

      if (!user) {
        return response.status(404).json("Wrong username!");
      }
      if (user.password !== password || user.email !== email) {
        return response.status(401).json({ error: "Credential invalid!" });
      }
      if(user && user.password === password && user.email === email) { 
        const accessToken = jwt.sign(
          {
            id: user.id,
            admin: user.admin,
          },
          process.env.JWT_ACCESS_KEY,
          { expiresIn: "1d" }
        );
        const { password, ...others } = user._doc;
        return response.status(200).json({ ...others, accessToken});
      }
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
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
