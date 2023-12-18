import type { Answer } from '../typings/Answer';

import mongoose, { Schema } from 'mongoose';

const answerSchema: Schema<Answer> = new Schema({
  answerID: {
    type: String,
    unique: true,
    immutable: true,
  },
  questionID: {
    type: String,
    required: true,
    immutable: true,
  },
  answer: {
    type: String,
    required: true,
  },
  followUpQuestion: {
    type: String,
    required: true,
    immutable: true,
  },
}, {
  collection: 'answers',
  versionKey: false,
});

const AnswerModel = mongoose.model<Answer>('Answer', answerSchema);

export default AnswerModel;
