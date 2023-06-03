import express from 'express';

import NotificationController from '../controllers/notifications.controllers.js';
import MiddlewareController from '../controllers/middleware.controller.js';

const notificationsRouter = express.Router({ mergeParams: true });

notificationsRouter.get('/', NotificationController.getNotificationsByUserId);

notificationsRouter.put(
  '/',
  MiddlewareController.verifyToken,
  NotificationController.markAllNotifications,
);

notificationsRouter.put(
  '/:notificationId',
  MiddlewareController.verifyToken,
  NotificationController.markNotification,
);

notificationsRouter.delete(
  '/:notificationId',
  MiddlewareController.verifyToken,
  NotificationController.deleteNotification,
);

export default notificationsRouter;
