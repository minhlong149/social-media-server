import { faker } from '@faker-js/faker';
import request from 'supertest';

import app from '../app.js';
import generatePosts from '../generator/generatePost.js';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';

const api = request(app);
const POST_COUNT = 1000;

describe('Generate posts', () => {
  beforeAll(async () => {
    await Post.deleteMany({});
  });

  test(`${POST_COUNT} posts are added to database`, async () => {
    const users = await User.find({});
    const posts = generatePosts(POST_COUNT);

    posts.forEach(async (post) => {
      const randomUser = faker.helpers.arrayElement(users);
      await Post.create({
        author: randomUser.id,
        caption: post.caption,
        mediaURL: post.mediaURL,
        privacy: post.privacy,
        hashtags: post.hashtags,
        likes: [],
        comments: [],
      });
    });
  }, 100000);

  test('Likes are added to posts', async () => {
    const users = await User.find({});
    const usersIds = users.map((user) => user.id);

    const posts = await Post.find({});
    posts.forEach(async (post) => {
      const author = await User.findById(post.author);
      const authorFriendsIds = author.friendsList.map((user) => user.userId);

      const usersTarget =
        post.privacy === 'public'
          ? faker.helpers.arrayElements(usersIds)
          : post.privacy === 'friends'
          ? faker.helpers.arrayElements(authorFriendsIds)
          : faker.helpers.arrayElement([[post.author], []]);

      post.likes = usersTarget;
      await post.save();
    });
  }, 100000);

  test.skip('Likes privacy is correct', async () => {
    const posts = await Post.find({});
    posts.forEach(async (post) => {
      switch (post.privacy) {
        case 'friends':
          const author = await User.findById(post.author);
          const authorFriendsIds = author.friendsList.map((user) => user.userId);
          post.likes.forEach((userId) => {
            expect(authorFriendsIds).toContain(userId);
          });
          break;

        case 'private':
          if (post.likes.length > 0) {
            expect(post.likes).toContain(post.author);
          } else {
            expect(post.likes.length).toBe(0);
          }
          break;
      }
    });
  }, 100000);
});
