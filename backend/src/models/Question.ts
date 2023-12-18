import type { Question } from '../typings/Question';

import mongoose, { Schema } from 'mongoose';

const questionSchema: Schema<Question> = new Schema({
  questionID: {
    type: String,
    unique: true,
    immutable: true,
  },
  inputType: {
    type: String,
    required: true,
    immutable: true,
  },
  title: {
    type: String,
    required: true,
    immutable: true,
  },
  description: {
    type: String,
    required: true,
    immutable: true,
  },
}, {
  collection: 'questions',
  versionKey: false,
});

const QuestionModel = mongoose.model<Question>('Question', questionSchema);

export default QuestionModel;
