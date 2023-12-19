import type { QuestionSet } from '../typings/QuestionSet';

import mongoose, { Schema } from 'mongoose';

const questionSetSchema: Schema<QuestionSet> = new Schema({
  questionSetID: {
    type: String,
    unique: true,
    immutable: true,
  },
  analysisSectionID: {
    type: String,
    required: true,
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
  collection: 'questionSets',
  versionKey: false,
});

const QuestionSetModel = mongoose.model<QuestionSet>('QuestionSet', questionSetSchema);

export default QuestionSetModel;
