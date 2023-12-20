import type { Content, ContentFeedback } from '../typings/Content';

import contentModel from '../models/Content';
import contentFeedbackModel from '../models/ContentFeedback';
import { v4 as uuidv4 } from 'uuid';

const addFeedback = async (contentID: string, feedbackData: ContentFeedback): Promise<ContentFeedback | null> => {
  try {
    const content: Content | null = await contentModel.findOne({ contentID });

    if (content) {
      feedbackData.feedbackID = uuidv4();
      feedbackData.createdAt = new Date().toISOString();
      const newContentFeedback = new contentFeedbackModel(feedbackData);
      await newContentFeedback.save();

      return feedbackData;
    }

    return null;
  } catch (error) {
    console.error('Something went wrong adding new feedback:', error);
    throw error;
  }
};

const feedbackController = {
  addFeedback,
};

export default feedbackController;
