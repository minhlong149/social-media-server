import express from 'express';

import CommentsController from '../controllers/comments.controller.js';
import LikesController from '../controllers/likes.controller.js';
import PostsController from '../controllers/posts.controller.js';
import MiddlewareController from '../controllers/middleware.controller.js';

const postsRouter = express.Router();

postsRouter.get('/', PostsController.getPosts);
postsRouter.post('/', MiddlewareController.verifyToken, PostsController.createPost);

postsRouter.get('/:postId', PostsController.getPostsById);
postsRouter.put('/:postId', MiddlewareController.verifyToken, PostsController.updatePostsById);
postsRouter.delete('/:postId', MiddlewareController.verifyToken, PostsController.deletePostsById);

postsRouter.post('/:postId/likes', MiddlewareController.verifyToken, LikesController.addLike);
postsRouter.delete('/:postId/likes/:userId', MiddlewareController.verifyToken, LikesController.removeLike);

postsRouter.get('/:postId/comments', CommentsController.getCommentsByPostId);
postsRouter.post('/:postId/comments', CommentsController.addComments);
postsRouter.put('/:postId/comments/:commentId', CommentsController.updateCommentsById);
postsRouter.delete('/:postId/comments/:commentId', CommentsController.deleteCommentsById);



export default postsRouter;

