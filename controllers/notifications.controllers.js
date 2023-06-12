import User from '../models/user.model.js';

const markAsRead = { $set: { 'notifications.$[elem].read': true } };
const notification = {
  path: 'notifications.notification',
  populate: {
    path: 'user',
    select: 'username firstName avatarURL profilePicture',
  },
};

export default class NotificationsController {
  static async getNotificationsByUserId(request, response) {
    try {
      const { userId } = request.params;
      const notifications = await User.findById(userId)
        .populate(notification)
        .select('notifications');
      return response.json(notifications);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  static async markAllNotifications(request, response) {
    try {
      const { userId } = request.params;
      const notifications = await User.findByIdAndUpdate(userId, markAsRead, {
        arrayFilters: [{ 'elem.read': false }],
        multi: true,
      })
        .populate(notification)
        .select('notifications');
      return response.json(notifications);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  static async markNotification(request, response) {
    try {
      const { userId, notificationId } = request.params;
      const notifications = await User.findByIdAndUpdate(userId, markAsRead, {
        arrayFilters: [{ 'elem._id': notificationId }],
      })
        .populate(notification)
        .select('notifications');
      return response.json(notifications);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  static async deleteNotification(request, response) {
    try {
      const { userId, notificationId } = request.params;
      await User.deleteOne({ '_id': userId, 'notifications._id': notificationId });
      return response.status(204).json();
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}
