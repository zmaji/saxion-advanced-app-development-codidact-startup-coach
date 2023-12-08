import type { companyAnalysis } from '../typings/CompanyAnalysis';

import axios from 'axios';
// import { BASE_URL } from '../../../config.ts';
const BASE_URL = 'http://127.0.0.1:3000';

const getCompanyAnalysis = async (companyAnalysisID: string): Promise<companyAnalysis | undefined> => {
  try {
    const response = await axios.get(`${BASE_URL}/companyAnalyses/${companyAnalysisID}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

const CompanyAnalysisController = {
  getCompanyAnalysis,
};

export default CompanyAnalysisController;
