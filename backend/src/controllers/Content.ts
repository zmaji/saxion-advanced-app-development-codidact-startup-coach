import type { Content } from '../typings/Content';

import { v4 as uuidv4 } from 'uuid';
import contentModel from '../models/Content';

const getAllContent = async (): Promise<Content[]> => {
  try {
    return await contentModel.find({}, { _id: 0 });
  } catch (error) {
    console.error('Something went wrong getting content:', error);
    throw error;
  }
};

const getContent = async (contentID: string): Promise<Content | null> => {
  try {
    return await contentModel.findOne({ contentID }, { _id: 0 });
  } catch (error) {
    console.error('Something went wrong getting content:', error);
    throw error;
  }
};

const createContent = async (contentData: Content): Promise<Content | null> => {
  try {
    contentData.contentID = uuidv4();
    contentData.createdAt = new Date().toISOString();
    // Labels toevoegen
    const newContent = new contentModel(contentData);
    await newContent.save();

    return newContent;
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

const companyAnalysisController = {
  getAllContent,
  getContent,
  createContent,
  updateContent,
  deleteContent,
};

export default companyAnalysisController;
