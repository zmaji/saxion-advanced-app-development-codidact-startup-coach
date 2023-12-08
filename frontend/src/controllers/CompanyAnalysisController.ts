import type { companyAnalysis } from '../typings/CompanyAnalysis';

import axios from 'axios';

// import { BASE_URL } from '../../../config';
const BASE_URL = 'http://127.0.0.1:3000';

const getCompanyAnalysis = async (companyAnalysisID: string): Promise<companyAnalysis | undefined> => {
  try {
    const response = await axios.get(`${BASE_URL}/companyAnalyses/${companyAnalysisID}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

const createCompanyAnalysis = async (companyAnalysisData: FormData): Promise<companyAnalysis | null> => {
  try {
    const response = await axios.post<companyAnalysis | null>(`${BASE_URL}/companyAnalyses`, companyAnalysisData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const CompanyAnalysisController = {
  getCompanyAnalysis,
  createCompanyAnalysis
};

export default CompanyAnalysisController;
