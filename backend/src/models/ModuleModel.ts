import type { Module } from '../typings/Module';

import mongoose, { Schema } from 'mongoose';

const moduleSchema: Schema<Module> = new Schema({
  moduleID: {
    type: String,
    unique: true,
    immutable: true,
  },
  roadmapID: {
    type: String,
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
}, {
  collection: 'modules',
  versionKey: false,
});

const ModuleModel = mongoose.model<Module>('Module', moduleSchema);

export default ModuleModel;
