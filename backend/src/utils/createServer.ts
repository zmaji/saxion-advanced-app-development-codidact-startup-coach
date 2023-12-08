import type { Express, Request, Response } from 'express';

import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import AuthRoutes from '../routes/Auth';
import IsLoggedIn from '../middleware/isLoggedIn';
import isLoggedIn from '../middleware/isLoggedIn';

const createServer = () => {
  const app: Express = express();

  app.use(cors());

  app.use(fileUpload({
    createParentPath: true,
  }));

  app.use(express.static('public'));

  app.use(express.urlencoded({
    extended: true,
  }));

  app.use(express.json());

  app.use('/credentials', AuthRoutes);

  app.get('', isLoggedIn, (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
  });

  return app;
};

export default createServer;
