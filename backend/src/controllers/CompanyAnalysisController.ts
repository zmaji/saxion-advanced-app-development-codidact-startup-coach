import type { companyAnalysis } from '../typings/CompanyAnalysis';

import CompanyAnalysisModel from '../models/CompanyAnalysisModel';

const getCompanyAnalyses = async (): Promise<companyAnalysis[]> => {
  try {
    return await CompanyAnalysisModel.find({}, { _id: 0 });
  } catch (error) {
    console.error('Something went wrong getting company analyses:', error);
    throw error;
  }
};

const getCompanyAnalysis = async (companyAnalysisID: string): Promise<companyAnalysis | null> => {
  try {
    const result = await CompanyAnalysisModel.findOne({ companyAnalysisID }, { _id: 0 });
    if (result) {
      return result;
    }

    return null;
  } catch (error) {
    console.error('Something went wrong getting a company analysis:', error);
    throw error;
  }
};

const CompanyAnalysisController = {
  getCompanyAnalyses,
  getCompanyAnalysis,
};

export default CompanyAnalysisController;
