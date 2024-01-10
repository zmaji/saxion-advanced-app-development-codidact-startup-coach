import type { CompanyAnalysis } from '../typings/CompanyAnalysis';

import mongoose, { Schema } from 'mongoose';

const companyAnalysisSchema: Schema<CompanyAnalysis> = new Schema({
  companyAnalysisID: {
    type: String,
    unique: true,
    immutable: true,
  },
  phase: {
    type: String,
    required: true,
  },
}, {
  collection: 'companyAnalyses',
  versionKey: false,
});

const CompanyAnalysisModel = mongoose.model<CompanyAnalysis>('CompanyAnalysis', companyAnalysisSchema);

export default CompanyAnalysisModel;
