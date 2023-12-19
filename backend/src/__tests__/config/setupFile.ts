import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import createServer from '../../utils/createServer';
import { Express } from 'express';
import companyModel from '../../models/Company';
import companyAnalysisModel from '../../models/CompanyAnalysis';
import labelModel from '../../models/Label';
import contentModel from '../../models/Content';
import contentLabelModel from '../../models/ContentLabel';
import userModel from '../../models/User';
import { companiesIndexData } from '../mocks/data/Companies';
import { companyAnalysesIndexData } from '../mocks/data/CompanyAnalyses';
import { labelsIndexData } from '../mocks/data/Labels';
import { contentsIndexData } from '../mocks/data/Contents';
import { contentLabelsIndexData } from '../mocks/data/ContentLabels';
import { usersIndexData } from '../mocks/data/Users';

let mongoServer: MongoMemoryServer;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export let app: Express;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  app = createServer();

  for (const company of companiesIndexData) {
    const newMockCompany = new companyModel(company);
    await newMockCompany.save();
  }

  for (const user of usersIndexData) {
    const newMockUser = new userModel(user);
    await newMockUser.save();
  }

  for (const companyAnalysis of companyAnalysesIndexData) {
    const newMockCompanyAnalysis = new companyAnalysisModel(companyAnalysis);
    await newMockCompanyAnalysis.save();
  }

  for (const label of labelsIndexData) {
    const newMockLabel = new labelModel(label);
    await newMockLabel.save();
  }

  for (const content of contentsIndexData) {
    const newMockContent = new contentModel(content);
    await newMockContent.save();
  }

  for (const contentLabel of contentLabelsIndexData) {
    const newMockContentLabel = new contentLabelModel(contentLabel);
    await newMockContentLabel.save();
  }
}, 60000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
}, 60000);
