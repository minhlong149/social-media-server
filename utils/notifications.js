import User from '../models/User.js';
import Post from '../models/Post.js';

export async function addNotification(notification) {
  try {
    const targetUsers = await getTargetUsers(notification);
    const newNotification = { notification: notification.id };
    const addNotification = { $push: { notifications: newNotification } };

    await notification.save();
    await User.updateMany(targetUsers, addNotification);
  } catch (error) {
    console.log(error);
  }
}

async function getTargetUsers(notification) {
  switch (notification.type) {
    case 'post':
      const user = await User.findById(notification.user);
      return user.friendsList
        .filter((friend) => friend.status === 'accepted')
        .map((friend) => friend.userId);

    case 'like':
    case 'comment':
      const post = await Post.findById(notification.target);
      return [post.author];

    case 'request':
    case 'accept':
      return [notification.target];
      break;

    default:
      return [];
  }
}
