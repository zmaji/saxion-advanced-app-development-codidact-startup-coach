import type { Express, Request, Response } from 'express';

import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import CompanyRoutes from '../routes/CompanyRouter';

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

  app.get('', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
  });

  app.use('/companies', CompanyRoutes);

  return app;
};

export default createServer;

