import type { companyAnalysis } from '../typings/CompanyAnalysis';

import httpService from '@/plugins/http/httpService';

const getCompanyAnalysis = async (companyAnalysisID: string): Promise<companyAnalysis | undefined> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await httpService.getRequest(`/companyAnalyses/${companyAnalysisID}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

const createCompanyAnalysis = async (companyAnalysisData: FormData): Promise<companyAnalysis | null> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await httpService.postRequest(`/companyAnalyses`, companyAnalysisData);

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
