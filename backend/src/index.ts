import type { Express } from 'express';

import dotenv from 'dotenv';
import createServer from './utils/createServer';

dotenv.config();

const app: Express = createServer();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
