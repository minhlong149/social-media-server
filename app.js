import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import loginRouter from './routes/login.route.js';
import postsRouter from './routes/posts.route.js';
import userRouter from './routes/users.route.js';
import config from './utils/config.js';

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connection to MongoDB:', error.message);
  });

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/login', loginRouter);
app.use('/api/posts', postsRouter);
app.use('/api/users', userRouter);

export default app;
