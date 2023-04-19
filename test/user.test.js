import { faker } from '@faker-js/faker';
import request from 'supertest';

import app from '../app.js';
import generateUsers from '../generator/generateUser.js';
import User from '../models/user.model.js';

const api = request(app);
const USER_COUNT = 50;

describe('Generate users', () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  const users = generateUsers(USER_COUNT);
  users.forEach(async (user) => {
    test(`Create user ${user.username}`, async () => {
      const response = await api.post('/api/users').send(user);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('username', user.username);
    });
  });

  test(`${USER_COUNT} users are added to database`, async () => {
    const users = await User.find({});
    expect(users).toHaveLength(USER_COUNT);
  });
});

test('Randomize relationship', async () => {
  const users = await User.find({});
  users.forEach(async (user) => {
    const friends = faker.helpers.arrayElements(users);
    friends.forEach(async (friend) => {
      const randomStatus = faker.helpers.arrayElement(['pending', 'accepted']);

      await user.updateOne({
        $push: {
          friendsList: {
            userId: friend.id,
            status: randomStatus,
          },
        },
      });

      await friend.updateOne({
        $push: {
          friendsList: {
            userId: user.id,
            status: randomStatus,
          },
        },
      });
    });
  });
});
