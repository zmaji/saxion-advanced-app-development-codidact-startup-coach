import type { ModuleCriteria } from '../typings/Module';

import mongoose, { Schema } from 'mongoose';

const moduleCriteriaSchema: Schema<ModuleCriteria> = new Schema({
  moduleID: {
    type: String,
    immutable: true,
  },
  questionID: {
    type: String,
  },
  selectedOptionID: {
    type: String,
  },
}, {
  collection: 'moduleCriteria',
  versionKey: false,
});

const moduleCriteriaModel = mongoose.model<ModuleCriteria>('ModuleCriteria', moduleCriteriaSchema);

export default moduleCriteriaModel;
