import type { Company } from '../typings/Company';

import mongoose, { Schema } from 'mongoose';

const companySchema: Schema<Company> = new Schema({
  companyID: {
    type: String,
    unique: true,
    immutable: true,
  },
  companyAnalysis: {
    type: String,
    unique: true,
  },
  roadmap: {
    type: String,
    immutable: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
}, {
  collection: 'companies',
  versionKey: false,
});

const companyModel = mongoose.model<Company>('Company', companySchema);

export default companyModel;
