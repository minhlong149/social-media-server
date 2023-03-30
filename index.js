import dotenv from 'dotenv';
import { createServer } from 'http';

import app from './app.js';

dotenv.config();

const port = process.env.PORT || 3000;
const server = createServer(app);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
