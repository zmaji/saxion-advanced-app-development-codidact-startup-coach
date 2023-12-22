import type { Content, ContentFeedback } from '../typings/Content';
import type { SimpleUser, User } from '../typings/User';

import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import contentModel from '../models/Content';
import contentFeedbackModel from '../models/ContentFeedback';
import userModel from '../models/User';

const addFeedback = async (
    contentID: string,
    headers: string,
    feedbackData: ContentFeedback,
): Promise<ContentFeedback | null> => {
  try {
    const content: Content | null = await contentModel.findOne({ contentID });
    const token = headers.split(' ')[1];
    const user: User = jwt.decode(token) as User;

    if (content) {
      feedbackData.feedbackID = uuidv4();
      feedbackData.contentID = contentID;
      feedbackData.createdAt = new Date().toISOString();
      feedbackData.userID = user.userID;
      const newContentFeedback = new contentFeedbackModel(feedbackData);
      await newContentFeedback.save();

      const relatedUser: SimpleUser | null = await userModel.findOne(
          { userID: user.userID },
          { userID: 1, fullName: 1, _id: 0 },
      );
      feedbackData.user = relatedUser!;
      feedbackData.userID = undefined;

      return feedbackData;
    }

    return null;
  } catch (error) {
    console.error('Something went wrong adding new feedback:', error);
    throw error;
  }
};

const contentFeedbackController = {
  addFeedback,
};

export default contentFeedbackController;
