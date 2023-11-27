import type { Express } from 'express';

import dotenv from 'dotenv';
import createServer from './utils/createServer';
import Database from './database/connection';

dotenv.config();

const app: Express = createServer();
const port = process.env.PORT || 3000;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const database = Database;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
