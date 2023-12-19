import type { AnalysisSection } from '../typings/AnalysisSection';

import analysisSectionModel from '../models/AnalysisSection';

const getAnalysisSections = async (): Promise<AnalysisSection[]> => {
  try {
    return await analysisSectionModel.find({}, { _id: 0 });
  } catch (error) {
    console.error('Something went wrong getting analysis sections:', error);
    throw error;
  }
};

const getAnalysisSection = async (analysisSectionID: string): Promise<AnalysisSection | null> => {
  try {
    const result = await analysisSectionModel.findOne({ analysisSectionID }, { _id: 0 });

    return result || null;
  } catch (error) {
    console.error('Something went wrong getting an analysis section:', error);
    throw error;
  }
};

const analysisSectionController = {
  getAnalysisSections,
  getAnalysisSection
};

export default analysisSectionController;
