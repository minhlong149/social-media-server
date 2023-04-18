import { createServer } from 'http';

import app from './app.js';
import config from './utils/config.js';

const port = config.PORT || 3001;
const server = createServer(app);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
