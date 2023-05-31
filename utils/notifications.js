import User from '../models/User.js';

export async function addNotification(notification) {
  try {
    const user = await User.findById(notification.user);
    const userFriendsIds = user.friendsList
      .filter((friend) => friend.status === 'accepted')
      .map((friend) => friend.userId);

    const userFriends =
      notification.targetModel === 'User'
        ? { id: notification.target }
        : { id: { $in: userFriendsIds } };

    const newNotification = { notification: notification.id };
    const addNotification = { $push: { notifications: newNotification } };

    await notification.save();
    await User.updateMany(userFriends, addNotification);
  } catch (error) {
    console.log(error);
  }
}