import express from 'express';

import CommentsController from '../controllers/comments.controller.js';
import LikesController from '../controllers/likes.controller.js';
import PostsController from '../controllers/posts.controller.js';

const postsRouter = express.Router();

postsRouter.get('/', PostsController.getPosts);
postsRouter.post('/', PostsController.createPost);

postsRouter.get('/:userId', PostsController.getPostsById);
postsRouter.put('/:userId', PostsController.updatePostsById);
postsRouter.delete('/:userId', PostsController.deletePostsById);

postsRouter.post('/:postId/likes', LikesController.addLike);
postsRouter.delete('/:postId/likes/:userId', LikesController.removeLike);

postsRouter.get('/:postId/comments', CommentsController.getCommentsByPostId);
postsRouter.post('/:postId/comments', CommentsController.addComments);
postsRouter.put('/:postId/comments/:commentId', CommentsController.updateCommentsById);

export default postsRouter;

