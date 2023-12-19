import type { AnalysisSection } from '../typings/AnalysisSection';

import mongoose, { Schema } from 'mongoose';

const analysisSectionSchema: Schema<AnalysisSection> = new Schema({
  analysisSectionID: {
    type: String,
    unique: true,
    immutable: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, {
  collection: 'analysisSections',
  versionKey: false,
});

const AnalysisSectionModel = mongoose.model<AnalysisSection>('AnalysisSection', analysisSectionSchema);

export default AnalysisSectionModel;
