import type { Company } from '../typings/Company';

import axios from 'axios';
// import { BASE_URL } from '../../../config';
const BASE_URL = 'http://127.0.0.1:3000';

const getCompany = async (companyID: string): Promise<Company | undefined> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/companies/${companyID}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateCompany = async (companyID: string, companyData: any): Promise<Company | undefined> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.put(`${BASE_URL}/companies/${companyID}`, companyData);

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
