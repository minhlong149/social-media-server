import { faker } from '@faker-js/faker';
import request from 'supertest';

import app from '../app.js';
import generateComments from '../generator/generateComment.js';
import Comment from '../models/comment.model.js';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';

const api = request(app);
const COMMENT_COUNT = 10000;

describe('Generate posts', () => {
  beforeAll(async () => {
    await Comment.deleteMany({});
    await Post.updateMany({}, { $set: { comments: [] } });
  });

  test(`${COMMENT_COUNT} comments are added to database`, async () => {
    const users = await User.find({});
    const usersIds = users.map((user) => user.id);

    const posts = await Post.find({});

    const comments = generateComments(COMMENT_COUNT);
    comments.forEach(async (comment) => {
      const randomPost = faker.helpers.arrayElement(posts);

      const author = await User.findById(randomPost.author);
      const authorFriendsIds = author.friendsList.map((user) => user.userId);

      const randomUserId =
        randomPost.privacy === 'public'
          ? faker.helpers.arrayElement(usersIds)
          : randomPost.privacy === 'friends'
          ? faker.helpers.arrayElement(authorFriendsIds)
          : randomPost.author;

      const newComment = new Comment({
        userID: randomUserId,
        text: comment.text,
      });

      await newComment.save();

      await randomPost.updateOne({
        $push: {
          comments: newComment._id,
        },
      });
    });

    const commentsInDb = await Comment.find({});
    expect(commentsInDb).toHaveLength(COMMENT_COUNT);
  }, 100000);
});
