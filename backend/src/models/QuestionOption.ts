import type { QuestionOption } from '../typings/QuestionOption';

import mongoose, { Schema } from 'mongoose';

const questionOptionSchema: Schema<QuestionOption> = new Schema({
  questionOptionID: {
    type: String,
    unique: true,
    immutable: true,
  },
  questionID: {
    type: String,
    required: true,
    immutable: true,
  },
  moduleID: {
    type: String,
    required: true,
    immutable: true,
  },
  value: {
    type: String,
    required: true,
  },
}, {
  collection: 'questionOptions',
  versionKey: false,
});

const QuestionOptionModel = mongoose.model<QuestionOption>('QuestionOption', questionOptionSchema);

export default QuestionOptionModel;
