import type { Step } from '../typings/Step';

import mongoose, { Schema } from 'mongoose';

const stepSchema: Schema<Step> = new Schema({
  stepID: {
    type: String,
    unique: true,
    immutable: true,
  },
  moduleID: {
    type: String,
    required: true,
    immutable: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  linkedContentID: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
  isDefault: {
    type: Boolean,
    required: true,
  },
}, {
  collection: 'steps',
  versionKey: false,
});

const StepModel = mongoose.model<Step>('Step', stepSchema);

export default StepModel;
