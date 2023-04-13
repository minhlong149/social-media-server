const User = require('../models/user.model');
f;

export default class FriendsController {
  static async getFriendsList(request, response) {
    const { userId } = request.params;
    const { pending } = request.query;
    try {
      // return 200 OK if success and the response
      let user = await User.findById({ userId: userId });
      let friends = await Promise.all(
        user.find({ friendsList: { status: '1' } }).friendsList.map((userId) => {
          return User.findById({ userId: userId });
        }),
      );
      let friendList = [];
      friends.map((friend) => {
        const { userId, firstName, lastName, avatarURL } = friend;
        friendList.push({ userId, firstName, lastName, avatarURL });
      });
      response.status(200).json(friendList);
    } catch (error) {
      // return 400 Bad Request if ID is invalid
      return response.status(400).json({
        error: errorhandler.getErrorMessage(error),
      });
    }
  }

  static async sentFriendRequest(request, response) {
    // return 201 Created if success and return YOUR user model
    // return 400 Bad Request if IDs is invalid
    const { userId } = request.params;
    const { friendId } = request.body;
    try {
      let user = await User.findById({ userId: userId });
      if (user.friendsList.userId.includes(friendId)) {
        if (user.find({ userId: 'friendId' }.friendsList.status == '1')) {
          res.status(403).json('You and this user is already friend');
        } else {
          res.status(403).json('You have already send a friend request to this user');
        }
      } else {
        await user.update({}, { $push: { friendsList: { UserId: friendId, status: '0' } } });
        res.status(201).json(user);
      }
    } catch (error) {
      return response.status(400).json({
        error: errorhandler.getErrorMessage(error),
      });
    }
  }

  static async acceptFriendRequest(request, response) {
    // return 200 OK if success and return YOUR user model
    // return 400 Bad Request if IDs is invalid
    const { userId, friendId } = request.params;
    try {
      let user = await User.findById({ userId: userId });
      if (!user.friendsList.userId.includes(friendId)) {
        res.status(403).json("Friend request doesn't exists.");
      } else {
        await user.updateOne({}, { friendsList: { userId: friendId, status: '1' } });
        res.status(201).json(user);
      }
    } catch (error) {
      return response.status(400).json({
        error: errorhandler.getErrorMessage(error),
      });
    }
  }

  static async removeFriend(request, response) {
    // ALWAY return 204 No Content
    // return 400 Bad Request if IDs is invalid
    const { userId, friendId } = request.params;
    try {
      let user = await User.findById({ userId: userId });
      if (!user.friendsList.userId.includes(friendId)) {
        res.status(403).json("Friend doesn't exists.");
      } else {
        await user.update({}, { $pull: { friendsList: { userId: friendId } } });
        res.status(204);
      }
    } catch (error) {
      return response.status(400).json({
        error: errorhandler.getErrorMessage(error),
      });
    }
  }

  static async getFriendsOfFriends(request, response) {
    // return 200 OK if success and the response
    // return 400 Bad Request if ID is invalid
    const { userId } = request.params;
    try {
      let user = await User.findById({ userId: userId });
      let friendOfUser = []
      await Promise.all(user.find({ friendsList: { status: '1' } }).friendsList.map((userId) => friendOfUser.push(userId)))
      let friendsOfFriends = []
      for (const Id in FriendOfUser)
      {
        let friend = User.findById({userId: Id})
        await Promise.all(friend.find({ friendsList: { status: '1' } }).friendsList.map((userId) => 
        {if (!friendOfUser.includes(userId) && !friendsOfFriends.includes(userId) && userId !== user.userId ){
        friendsOfFriends.push(userId)}}))
      }
      res.status(200).json(friendsOfFriends)
    }catch(error)
    {
      return response.status(400).json({
        error: errorhandler.getErrorMessage(error),
      });
    }
  }
}
