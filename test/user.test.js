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
      expect(response.body).toHaveProperty('id');
    });
  });

  test(`${USER_COUNT} users are added to database`, async () => {
    const users = await User.find({});
    expect(users).toHaveLength(USER_COUNT);
  });
});
