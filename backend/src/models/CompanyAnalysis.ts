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
  serviceInformation: {
    type: String,
  },
  nrOfEmployees: {
    type: Number,
    required: true,
  },
  stage: {
    type: String,
    required: true,
  },
  businessGoals: {
    type: [String],
  },
  painPoints: {
    type: [String],
  },
  competitors: {
    type: [String],
  },
  targetAudience: {
    type: String,
  },
  budget: {
    type: Number,
  },
}, {
  collection: 'companyAnalyses',
  versionKey: false,
});

const CompanyAnalysisModel = mongoose.model<companyAnalysis>('CompanyAnalysis', companyAnalysisScheme);

export default CompanyAnalysisModel;
