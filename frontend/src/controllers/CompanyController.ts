import type { Company } from '../typings/Company';

import httpService from '@/plugins/http/httpService';

const getCompany = async (companyID: string): Promise<Company | undefined> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await httpService.getRequest(`/companies/${companyID}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateCompany = async (companyID: string, companyData: any): Promise<Company | undefined> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await httpService.putRequest(`/companies/${companyID}`, companyData);

    return response.data;
  } catch (error) {
    throw error;
  }
};

const CompanyController = {
  getCompany,
  updateCompany
};

export default CompanyController;

