import express from 'express';

import FriendsController from '../controllers/friends.controller.js';
import UsersController from '../controllers/users.controller.js';
import MiddlewareController from '../controllers/middleware.controller.js';
import notificationsRouter from './notifications.route.js';


const userRouter = express.Router();

userRouter.get('/', UsersController.getUsers);
userRouter.post('/', UsersController.createUser);

userRouter.get('/:userId', UsersController.getUsersById);
userRouter.put('/:userId', MiddlewareController.verifyToken, UsersController.updateUsersById);
userRouter.delete('/:userId', MiddlewareController.verifyToken, UsersController.deleteUsersById);

userRouter.use('/:userId/notifications', notificationsRouter);

userRouter.get('/:userId/friends', FriendsController.getFriendsList);
userRouter.post('/:userId/friends', MiddlewareController.verifyToken, FriendsController.sentFriendRequest);

userRouter.put('/:userId/friends/:friendId', MiddlewareController.verifyToken, FriendsController.acceptFriendRequest);
userRouter.delete('/:userId/friends/:friendId', MiddlewareController.verifyToken, FriendsController.removeFriend);

userRouter.get('/:userId/friendsOfFriends', FriendsController.getFriendsOfFriends);

export default userRouter;
