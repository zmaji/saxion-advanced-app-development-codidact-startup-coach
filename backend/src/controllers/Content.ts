import type { Content, ContentFeedback } from '../typings/Content';
import type { ContentLabel, Label } from '../typings/Label';
import type { ContentUser, SimpleUser } from '../typings/User';

import { v4 as uuidv4 } from 'uuid';
import contentModel from '../models/Content';
import contentLabelModel from '../models/ContentLabel';
import labelModel from '../models/Label';
import userModel from '../models/User';
import contentUserModel from '../models/ContentUser';
import contentFeedbackModel from '../models/ContentFeedback';

interface Filter {
  title?: { $regex: string; $options: string } | string;
  contentID?: { $in: string[] };
  category?: string;
}

const getAllContent = async (
    title: string,
    labels: string[],
    category: string,
): Promise<Content[]> => {
  try {
    let labelIDs: string[] = [];

    if (labels && labels.length > 0) {
      const labelResults: Label[] = await labelModel.find({ name: { $in: labels } }, { labelID: 1 });
      labelIDs = labelResults.map((label) => label.labelID);
    }

    const filter: Filter = {};

    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }

    if (labelIDs.length > 0) {
      const contentLabelResults: ContentLabel[] = await contentLabelModel.find(
          { labelID: { $in: labelIDs } },
          { contentID: 1 },
      );
      const contentIDs = contentLabelResults.map((contentLabel) => contentLabel.contentID);

      filter.contentID = { $in: contentIDs };
    }

    if (category) {
      filter.category = category;
    }

    const result: Content[] = await contentModel.find(filter, { _id: 0 }).lean();
    const contentLabels: ContentLabel[] = await contentLabelModel.find({}, { _id: 0 });
    const labelsData: Label[] = await labelModel.find({}, { _id: 0 });

    if (result) {
      const contents: Content[] = [];

      for (const content of result) {
        const labelsOfContent = contentLabels.filter(
            (contentLabel: ContentLabel) => contentLabel.contentID === content.contentID,
        );
        const relatedLabels: Label[] = [];

        for (const contentLabel of labelsOfContent) {
          const label = labelsData.find((label: Label) => label.labelID === contentLabel.labelID);

          if (label) {
            relatedLabels.push(label);
          }
        }

        contents.push({
          ...content,
          labels: relatedLabels,
        });
      }

      return contents;
    }

    return result;
  } catch (error) {
    console.error('Something went wrong getting content:', error);
    throw error;
  }
};

const getContent = async (contentID: string): Promise<Content | null> => {
  try {
    let result: Content | null = await contentModel.findOne({ contentID }, { _id: 0 }).lean();

    if (result) {
      const relatedUser: SimpleUser | null = await userModel.findOne(
          { userID: result.user },
          { userID: 1, fullName: 1, _id: 0 },
      );
      const contentFeedback: ContentFeedback[] = await contentFeedbackModel.find(
          { contentID: contentID },
          { _id: 0 },
      ).lean();
      const contentFeedbackWithUsers: ContentFeedback[] = [];
      const contentUsers: ContentUser[] = await contentUserModel.find({ contentID: contentID }, { _id: 0 }).lean();
      const relatedUsers: ContentUser[] = [];
      const contentLabels = await contentLabelModel.find({ contentID });
      const labels: Label[] = await labelModel.find({}, { _id: 0 }).lean();
      const relatedLabels: Label[] = [];

      for (const contentLabel of contentLabels) {
        const label = labels.find((label: Label) => label.labelID === contentLabel.labelID);

        if (label) {
          relatedLabels.push(label);
        }
      }

      for (const contentUser of contentUsers) {
        const user: SimpleUser | null = await userModel.findOne(
            { userID: contentUser.userID },
            { userID: 1, fullName: 1, _id: 0 },
        );

        if (user) {
          const relatedUser: ContentUser = {
            ...contentUser,
            fullName: user.fullName,
          };

          relatedUsers.push(relatedUser);
        }
      }

      for (const feedback of contentFeedback) {
        const user: SimpleUser | null = await userModel.findOne(
            { userID: feedback.user },
            { userID: 1, fullName: 1, _id: 0 },
        );

        if (user) {
          const relatedUser: SimpleUser = {
            userID: user.userID,
            fullName: user.fullName,
          };

          contentFeedbackWithUsers.push({
            ...feedback,
            user: relatedUser,
          });
        }
      }

      result.contentUsers = relatedUsers;
      result.feedback = contentFeedbackWithUsers;
      result.user = relatedUser!;
      result = {
        ...result,
        labels: relatedLabels,
      };

      return result;
    }

    return result;
  } catch (error) {
    console.error('Something went wrong getting content:', error);
    throw error;
  }
};

const createContent = async (contentData: Content): Promise<Content | null> => {
  try {
    contentData.contentID = uuidv4();
    contentData.createdAt = new Date().toISOString();
    const labels: Label[] = [];

    for (const label of contentData.labels!) {
      const existingLabel = await labelModel.findOne({ labelID: label.labelID });
      let contentLabel: ContentLabel;

      if (existingLabel) {
        contentLabel = {
          contentID: contentData.contentID,
          labelID: label.labelID,
        };
      } else {
        label.labelID = uuidv4();
        const newLabel = new labelModel(label);

        await newLabel.save();

        contentLabel = {
          contentID: contentData.contentID,
          labelID: newLabel.labelID,
        };
      }

      const newContentLabel = new contentLabelModel(contentLabel);
      await newContentLabel.save();
      labels.push(label);
    }

    const newContent = new contentModel(contentData);
    await newContent.save();
    contentData.labels = labels;

    return contentData;
  } catch (error) {
    console.error('Something went wrong creating new content:', error);
    throw error;
  }
};

const updateContent = async (
    contentID: string,
    newContentData: Content,
): Promise<Content | null> => {
  try {
    const updatedContent = await contentModel.findOneAndUpdate(
        { contentID },
        newContentData,
        { new: true },
    );

    return updatedContent;
  } catch (error) {
    console.error('Something went wrong creating new content:', error);
    throw error;
  }
};

const deleteContent = async (contentID: string): Promise<Content | null> => {
  try {
    return await contentModel.findOneAndDelete({ contentID }, { _id: 0 });
  } catch (error) {
    console.error('Something went wrong creating new content:', error);
    throw error;
  }
};

const contentController = {
  getAllContent,
  getContent,
  createContent,
  updateContent,
  deleteContent,
};

export default contentController;
