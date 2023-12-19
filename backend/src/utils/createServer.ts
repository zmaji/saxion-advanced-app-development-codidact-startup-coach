import type { Express, Request, Response } from 'express';

import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import isLoggedIn from '../middleware/isLoggedIn';
import authRoutes from '../routes/Auth';
import companyRoutes from '../routes/Company';
import companyAnalysesRoutes from '../routes/CompanyAnalysis';
import contentRoutes from '../routes/Content';
import categoryRoutes from '../routes/Category';
import labelRoutes from '../routes/Label';
import userRoutes from '../routes/User';
import contentUserRoutes from '../routes/ContentUser';

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
  app.use('/content', contentRoutes);
  app.use('/categories', categoryRoutes);
  app.use('/labels', labelRoutes);
  app.use('/users', userRoutes);
  app.use('/contentUsers', contentUserRoutes);

  return app;
};

export default createServer;
