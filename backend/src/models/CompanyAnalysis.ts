import type { companyAnalysis } from '../typings/CompanyAnalysis';

import mongoose, { Schema } from 'mongoose';

const companyAnalysisScheme: Schema<companyAnalysis> = new Schema({
  companyAnalysisID: {
    type: String,
    unique: true,
    immutable: true,
  },
  industry: {
    type: String,
    required: true,
  },
  nrOfEmployees: {
    type: String,
    required: true,
  },
  stage: {
    type: String,
    required: true,
  },
  businessGoals: {
    type: String
  },
  paintPoints: {
    type: [String]
  },
  competitors: {
    type: [String]
  },
  targetAudience: {
    type: String
  },
  serviceInformation: {
    type: String
  },
  budget: {
    type: Number
  },
}, {
  collection: 'companyAnalyses',
  versionKey: false,
});

const CompanyAnalysisModel = mongoose.model<companyAnalysis>('CompanyAnalysis', companyAnalysisScheme);

export default CompanyAnalysisModel;