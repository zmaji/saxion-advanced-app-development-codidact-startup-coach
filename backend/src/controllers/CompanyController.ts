import type { Company } from '../typings/Company';

import CompanyModel from '../models/Company';

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
    console.error('Something went wrong getting a company:', error);
    throw error;
  }
};

const updateCompany = async (companyID: string, companyData: Company): Promise<Company | null> => {
  try {
    const updatedCompany = await CompanyModel.findOneAndUpdate(
      { companyID },
      companyData,
      { new: true },
    );

    if (updatedCompany) {
      return updatedCompany;
    }

    return null;
  } catch (error) {
    console.error('Something went wrong updating a company', error);
    throw error;
  }
};

const CompanyController = {
  getCompanies,
  getCompany,
  updateCompany,
};

export default CompanyController;
