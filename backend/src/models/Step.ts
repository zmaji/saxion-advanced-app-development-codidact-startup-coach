import type { Step } from '../typings/Step';

import mongoose, { Schema } from 'mongoose';

const stepSchema: Schema<Step> = new Schema({
  stepID: {
    type: String,
    unique: true,
    immutable: true
  },
  moduleID: {
    type: String,
    required: true,
    immutable: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
}, {
  collection: 'steps',
  versionKey: false,
});

const StepModel = mongoose.model<Step>('Module', stepSchema);

export default StepModel;