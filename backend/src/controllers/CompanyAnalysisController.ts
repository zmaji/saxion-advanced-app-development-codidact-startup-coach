import type { companyAnalysis } from '../typings/CompanyAnalysis';

import { v4 as uuidv4 } from 'uuid';
import CompanyAnalysisModel from '../models/CompanyAnalysis';

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

    return result || null;
  } catch (error) {
    console.error('Something went wrong getting a company analysis:', error);
    throw error;
  }
};

// eslint-disable-next-line max-len
const createCompanyAnalysis = async (companyAnalysisData: companyAnalysis): Promise<companyAnalysis | null> => {
  try {
    companyAnalysisData.companyAnalysisID = uuidv4();

    const newCompanyAnalysis = new CompanyAnalysisModel(companyAnalysisData);
    const companyAnalysis = await newCompanyAnalysis.save();

    return companyAnalysis || null;
  } catch (error) {
    console.error('Something went wrong creating a company analysis:', error);
    throw error;
  }
};

const CompanyAnalysisController = {
  getCompanyAnalyses,
  getCompanyAnalysis,
  createCompanyAnalysis,
};

export default CompanyAnalysisController;
