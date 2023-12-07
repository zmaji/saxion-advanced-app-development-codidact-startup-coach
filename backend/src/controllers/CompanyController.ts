import type { Company } from '../typings/Company';

import CompanyModel from '../models/CompanyModel';

const getCompanies = async (): Promise<Company[]> => {
  try {
    return await CompanyModel.find({}, { _id: 0 });
  } catch (error) {
    console.error('Something went wrong getting companies:', error);
    throw error;
  }
};

const getCompany = async (companyID: string): Promise<Company | null> => {
  try {
    const result = await CompanyModel.findOne({ companyID }, { _id: 0 });
    if (result) {
      return result;
    }

    return null;
  } catch (error) {
    console.error('Something went wrong getting a comment:', error);
    throw error;
  }
};

const CompanyController = {
  getCompanies,
  getCompany,
};

export default CompanyController;
