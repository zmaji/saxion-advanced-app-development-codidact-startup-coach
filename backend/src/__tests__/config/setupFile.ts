import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import createServer from '../../utils/createServer';
import { Express } from 'express';

import CompanyModel from '../../models/Company';
import CompanyAnalysisModel from '../../models/CompanyAnalysis';

import { companiesIndexData } from '../mocks/data/Companies';
import { companyAnalysesIndexData } from '../mocks/data/CompanyAnalyses';

let mongoServer: MongoMemoryServer;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export let app: Express;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  app = createServer();

  for (const company of companiesIndexData) {
    const newMockCompany = new CompanyModel(company);
    await newMockCompany.save();
  }

  for (const companyAnalysis of companyAnalysesIndexData) {
    const newMockCompanyAnalysis = new CompanyAnalysisModel(companyAnalysis);
    await newMockCompanyAnalysis.save();
  }

}, 60000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
}, 60000);
