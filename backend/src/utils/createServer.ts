import type { Express, Request, Response } from 'express';

import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import authRoutes from '../routes/Auth';
import isLoggedIn from '../middleware/isLoggedIn';
import companyRoutes from '../routes/Company';
import companyAnalysesRoutes from '../routes/CompanyAnalysis';

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

  app.use('/credentials', authRoutes);

  app.get('', isLoggedIn, (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
  });

  app.use('/companies', companyRoutes);
  app.use('/companyAnalyses', companyAnalysesRoutes);

  return app;
};

export default createServer;

