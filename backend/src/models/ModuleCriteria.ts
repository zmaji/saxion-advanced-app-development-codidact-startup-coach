import type { ModuleCriteria } from '../typings/Module';

import mongoose, { Schema } from 'mongoose';

const moduleCriteriaSchema: Schema<ModuleCriteria> = new Schema({
  moduleID: {
    type: String,
    unique: true,
    immutable: true,
  },
  questionID: {
    type: String,
    unique: true,
  },
  selectedOptionID: {
    type: String,
    unique: true,
  },
}, {
  collection: 'moduleCriteria',
  versionKey: false,
});

const moduleCriteriaModel = mongoose.model<ModuleCriteria>('ModuleCriteria', moduleCriteriaSchema);

export default moduleCriteriaModel;
