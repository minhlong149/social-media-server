import express from 'express';

import UsersController from '../controllers/users.controller.js';

const loginRouter = express.Router();

loginRouter.post('/login', UsersController.login);

export default loginRouter;
