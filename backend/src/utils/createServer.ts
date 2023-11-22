import type { Express, Request, Response } from 'express';

import express from 'express';
import cors from 'cors';

const createServer = () => {
  const app: Express = express();

  app.use(cors());

  app.use(express.urlencoded({
    extended: true,
  }));

  app.use(express.json());

  app.get('', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
  });

  return app;
};

export default createServer;
