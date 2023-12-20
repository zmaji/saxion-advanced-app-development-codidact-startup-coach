import type { ContentFeedback } from '../typings/Content';

import mongoose, { Schema } from 'mongoose';

const contentFeedbackSchema: Schema<ContentFeedback> = new Schema({
  feedbackID: {
    type: String,
  },
  contentID: {
    type: String,
  },
  userID: {
    type: String,
  },
  feedback: {
    type: String,
  },
  createdAt: {
    type: String,
  },
}, {
  collection: 'contentFeedback',
  versionKey: false,
});

const contentFeedbackModel = mongoose.model<ContentFeedback>('ContentFeedback', contentFeedbackSchema);

export default contentFeedbackModel;
