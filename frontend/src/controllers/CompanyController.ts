import type { Company } from '../typings/Company';

import axios from 'axios';
// import { BASE_URL } from '../../../config.ts';
const BASE_URL = 'http://127.0.0.1:3000';

const getCompany = async (companyID: string): Promise<Company | undefined> => {
  try {
    const response = await axios.get(`${BASE_URL}/companies/${companyID}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

const CompanyController = {
  getCompany,
};

export default CompanyController;
