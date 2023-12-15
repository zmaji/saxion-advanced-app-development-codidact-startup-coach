import type { CompanyAnalysis } from '../typings/CompanyAnalysis';

import companyAnalysisModel from '../models/CompanyAnalysis';
import { v4 as uuidv4 } from 'uuid';
import { removeIdField } from '../helpers/removeMongoID';

const getCompanyAnalyses = async (): Promise<CompanyAnalysis[]> => {
  try {
    return await companyAnalysisModel.find({}, { _id: 0 });
  } catch (error) {
    console.error('Something went wrong getting company analyses:', error);
    throw error;
  }
};

const getCompanyAnalysis = async (companyAnalysisID: string): Promise<CompanyAnalysis | null> => {
  try {
    const result = await companyAnalysisModel.findOne({ companyAnalysisID }, { _id: 0 });

    return result || null;
  } catch (error) {
    console.error('Something went wrong getting a company analysis:', error);
    throw error;
  }
};

const createCompanyAnalysis = async (companyAnalysisData: CompanyAnalysis): Promise<CompanyAnalysis | null> => {
  try {
    companyAnalysisData.companyAnalysisID = uuidv4();

    const newCompanyAnalysis = new companyAnalysisModel(companyAnalysisData);
    const companyAnalysis = await newCompanyAnalysis.save();

    return removeIdField(companyAnalysis);
  } catch (error) {
    console.error('Something went wrong creating a company analysis:', error);
    throw error;
  }
};

const companyAnalysisController = {
  getCompanyAnalyses,
  getCompanyAnalysis,
  createCompanyAnalysis,
};

export default companyAnalysisController;
