import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Express } from 'express';
import createServer from '../../utils/createServer';
import companyModel from '../../models/Company';
import companyAnalysisModel from '../../models/CompanyAnalysis';
import labelModel from '../../models/Label';
import contentModel from '../../models/Content';
import contentLabelModel from '../../models/ContentLabel';
import userModel from '../../models/User';
import roadmapModel from '../../models/Roadmap';
import moduleModel from '../../models/Module';
import contentUserModel from '../../models/ContentUser';
import contentFeedbackModel from '../../models/ContentFeedback';
import stepModel from '../../models/Step';
import analysisSectionModel from '../../models/AnalysisSection';
import answersModel from '../../models/Answer';
import questionSetModel from '../../models/QuestionSet';
import questionModel from '../../models/Question';
import questionOptionModel from '../../models/QuestionOption';
import { companiesIndexData } from '../mocks/data/Companies';
import { companyAnalysesIndexData } from '../mocks/data/CompanyAnalyses';
import { labelsIndexData } from '../mocks/data/Labels';
import { contentsIndexData } from '../mocks/data/Contents';
import { contentLabelsIndexData } from '../mocks/data/ContentLabels';
import { usersIndexData } from '../mocks/data/Users';
import { contentFeedbackIndexData } from '../mocks/data/ContentFeedback';
import { contentUsersIndexData } from '../mocks/data/ContentUsers';
import { roadmapIndexData } from '../mocks/data/Roadmap';
import { moduleIndexData } from '../mocks/data/Modules';
import { stepsIndexData } from '../mocks/data/Steps';
import { analysisSectionIndexData } from '../mocks/data/AnalysisSections';
import { answersIndexData } from '../mocks/data/Answers';
import { questionSetsIndexData } from '../mocks/data/QuestionSets';
import { questionsIndexData } from '../mocks/data/Questions';
import { questionOptionsIndexData } from '../mocks/data/QuestionOptions';

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

  for (const contentUser of contentUsersIndexData) {
    const newMockContentUser = new contentUserModel(contentUser);
    await newMockContentUser.save();
  }

  for (const contentFeedback of contentFeedbackIndexData) {
    const newMockContentFeedback = new contentFeedbackModel(contentFeedback);
    await newMockContentFeedback.save();
  }

  for (const roadmap of roadmapIndexData) {
    const newMockRoadmap = new roadmapModel(roadmap);
    await newMockRoadmap.save();
  }

  for (const module of moduleIndexData) {
    const newMockModule = new moduleModel(module);
    await newMockModule.save();
  }

  for (const step of stepsIndexData) {
    const newMockStep = new stepModel(step);
    await newMockStep.save();
  }

  for (const analysisSection of analysisSectionIndexData) {
    const newMockStep = new analysisSectionModel(analysisSection);
    await newMockStep.save();
  }

  for (const answer of answersIndexData) {
    const newMockStep = new answersModel(answer);
    await newMockStep.save();
  }

  for (const questionSet of questionSetsIndexData) {
    const newMockStep = new questionSetModel(questionSet);
    await newMockStep.save();
  }

  for (const question of questionsIndexData) {
    const newMockStep = new questionModel(question);
    await newMockStep.save();
  }

  for (const questionOption of questionOptionsIndexData) {
    const newMockStep = new questionOptionModel(questionOption);
    await newMockStep.save();
  }
}, 60000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
}, 60000);
