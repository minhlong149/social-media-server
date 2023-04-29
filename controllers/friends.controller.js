import mongoose from "mongoose";
import User from "../models/user.model.js"
const ObjectId = mongoose.Types.ObjectId
//here uses the status value in friendsList to indicate friend or friend request
//status: '1' means friend, status: '0' means friend request
export default class FriendsController {
  static async getFriendsList(request, response) {
    const { userId } = request.params;
    const { pending } = request.query;
    try {
      // return 200 OK if success and the response
      let user = await User.findById(userId);
      let friends = []
      for (let i in user.friendsList)
      {
        if(user.friendsList[parseInt(i)]["status"] == "accepted")
        {
          friends.push(user.friendsList[parseInt(i)]["userId"])
          console.log(user.friendsList[parseInt(i)]["userId"])
        }
      }
      let friendList = [];
      for ( let i in friends)
      {
        let friend = await User.findById(friends[i])
        const {firstName, lastName, avatarURL } = friend
        const friendId = friends[i].userId
        friendList.push({friendId, firstName, lastName, avatarURL})
      }
      response.status(200).json(friendList);
    } catch (error) { 
      // return 400 Bad Request if ID is invalid
      response.status(500).json({ message: error.message });
    }
  }

  static async sentFriendRequest(request, response) {
    // return 201 Created if success and return YOUR user model
    // return 400 Bad Request if IDs is invalid
    const { userId } = request.params;
    const { friendId } = request.body;
    
    try {
      
      let user = await User.findById(userId);
      let isFriend = false;
      for (let i in user.friendsList)
      {
        if(user.friendsList[parseInt(i)]["userId"] == friendId)
        {
          isFriend = true;
          if (user.friendsList[parseInt(i)]["status"] == "pending")
          {
            response.status(400).json("You have already sent a friend request to this person.")
          }
          else{
            response.status(400).json("You and this person is already friend")
          }
          break;
          
        }
      }
      if(isFriend == false){
        await User.findOneAndUpdate({_id: userId}, { $push: { friendsList: {userId: friendId, status: "pending" } }});
        await User.findOneAndUpdate({_id: friendId}, { $push: { friendsList: {userId: userId, status: "pending" } }});
        response.status(201).json(user);
      }
      }
     catch (error) {
      response.status(400).json({ message: error.message });
    }
  }

  static async acceptFriendRequest(request, response) {
    // return 200 OK if success and return YOUR user model
    // return 400 Bad Request if IDs is invalid
    const { userId, friendId } = request.params;
    try {
      let user = await User.findById(userId);
      let isRequestSent = false;
      for (let i in user.friendsList)
      {
        if(user.friendsList[parseInt(i)]["userId"] == friendId)
        {
          isRequestSent = true;
          if (user.friendsList[parseInt(i)]["status"] == "accepted")
          {
            response.status(400).json("You and this person is already friend")
          }else
          {
          await User.updateOne({_id: userId, "friendsList.userId": friendId}, {$set: {"friendsList.$.status": "accepted"}})
          await User.updateOne({_id: friendId, "friendsList.userId": userId}, {$set: {"friendsList.$.status": "accepted"}})
          response.status(201).json(user);
          }
          break; 
        }
      }
      if(isRequestSent == false)
        {
          response.status(400).json("Friend request doesn't exist.")
        }
  }catch(error)
  {
    response.status(400).json({ message: error.message });
  }
}

  static async removeFriend(request, response) {
    // ALWAY return 204 No Content
    // return 400 Bad Request if IDs is invalid
    const { userId, friendId } = request.params;
    try {
      let user = await User.findById(userId);
      let isFriend = false;
      for (let i in user.friendsList)
      {
        if(user.friendsList[parseInt(i)]["userId"] == friendId)
        {
          isFriend = true;
          await User.updateOne({_id: userId},{$pull: {friendsList: {userId: friendId}}})
          await User.updateOne({_id: friendId},{$pull: {friendsList: {userId: userId}}})
          response.status(201).json(user);
        }
      }
      if(isFriend == false)
      {
        response.status(400).json("You and this person is not friend")
      }
      
      }
     catch (error) {
      response.status(400).json({ message: error.message });
    }
  }

  static async getFriendsOfFriends(request, response) {
    // return 200 OK if success and the response
    // return 400 Bad Request if ID is invalid
    const { userId } = request.params;
    try {
      let user = await User.findById(userId);
      let myFriendList = []
      let sameFriendsList = []
      for (let i in user.friendsList)
      {
        myFriendList.push(user.friendsList[parseInt(i)]["userId"])
      }
      for (let i in myFriendList)
      {
        let friend = await User.findById(myFriendList[parseInt(i)])
        for (let j in friend.friendsList)
        {
          if(JSON.stringify(myFriendList).indexOf(JSON.stringify(friend.friendsList[parseInt(j)]["userId"])) != -1 && JSON.stringify(sameFriendsList).indexOf(JSON.stringify(friend.friendsList[parseInt(j)]["userId"])) == -1 )
          {
            sameFriendsList.push(friend.friendsList[parseInt(j)]["userId"])
          }
        }
      }
      let friends = []
      for (let i in user.friendsList)
      {
        if(user.friendsList[parseInt(i)]["status"] == "accepted")
        {
          friends.push(user.friendsList[parseInt(i)]["userId"])
        }
      }
      let friendList = [];
      for ( let i in friends)
      {
        let friend = await User.findById(friends[i])
        const {firstName, lastName, avatarURL } = friend
        const friendId = friends[i].userId
        friendList.push({friendId, firstName, lastName, avatarURL})
      }
      response.status(200).json(friendList)
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }
}
