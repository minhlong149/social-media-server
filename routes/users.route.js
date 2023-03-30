import express from 'express';

import FriendsController from '../controllers/friends.controller.js';
import UsersController from '../controllers/users.controller.js';

const userRouter = express.Router();

userRouter.get('/', UsersController.getUsers);
userRouter.post('/', UsersController.createUser);

userRouter.get('/:userId', UsersController.getUsersById);
userRouter.put('/:userId', UsersController.updateUsersById);
userRouter.delete('/:userId', UsersController.deleteUsersById);

userRouter.get('/:userId/friends', FriendsController.getFriendsList);
userRouter.post('/:userId/friends', FriendsController.sentFriendRequest);

userRouter.put('/:userId/friends/:friendId', FriendsController.acceptFriendRequest);
userRouter.delete('/:userId/friends/:friendId', FriendsController.removeFriend);

userRouter.get('/:userId/friendsOfFriends', FriendsController.getFriendsOfFriends);

export default userRouter;
