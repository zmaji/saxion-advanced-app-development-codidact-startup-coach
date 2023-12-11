import type { Content } from '../typings/Content';

import { v4 as uuidv4 } from 'uuid';
import ContentModel from '../models/Content';

const getAllContent = async (): Promise<Content[]> => {
  try {
    return await ContentModel.find({}, { _id: 0 });
  } catch (error) {
    console.error('Something went wrong getting content:', error);
    throw error;
  }
};

const getContent = async (contentID: string): Promise<Content | null> => {
  try {
    const result = await ContentModel.findOne({ contentID }, { _id: 0 });

    return result || null;
  } catch (error) {
    console.error('Something went wrong getting content:', error);
    throw error;
  }
};

const createContent = async (contentData: Content): Promise<Content | null> => {
  try {
    contentData.contentID = uuidv4();
    const newContent = new ContentModel(contentData);

    return newContent || null;
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
    const newContent = await ContentModel.findOneAndUpdate(
        { contentID },
        newContentData,
        { new: true },
    );

    return newContent || null;
  } catch (error) {
    console.error('Something went wrong creating new content:', error);
    throw error;
  }
};

const deleteContent = async (contentID: string): Promise<Content | null> => {
  try {
    const result = await ContentModel.findOneAndDelete({ contentID }, { _id: 0 }) || null;

    return result || null;
  } catch (error) {
    console.error('Something went wrong creating new content:', error);
    throw error;
  }
};

const companyAnalysisController = {
  getAllContent,
  getContent,
  createContent,
  updateContent,
  deleteContent,
};

export default companyAnalysisController;
