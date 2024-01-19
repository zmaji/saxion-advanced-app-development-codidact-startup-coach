import { Request, Response, NextFunction } from 'express';
import { Company } from '../typings/Company';
import { Module } from '../typings/Module';
import { StatusCodes } from 'http-status-codes';
import moduleModel from '../models/Module';
import CompanyModel from '../models/Company';

const isCompanyModule = async (req : Request, res: Response, next: NextFunction) => {
  const userCompanyID = req.user?.company;
  const moduleID = req.params.moduleID;

  try {
    const userCompany: Company | null = await CompanyModel.findOne({ companyID: userCompanyID });
    const module: Module | null = await moduleModel.findOne({ moduleID: moduleID });

    if (!userCompany) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Company not found' });

      return;
    }

    if (!module) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Module not found' });

      return;
    }

    if ( userCompany.roadmap === module.roadmapID) {
      next();
    } else {
      res
          .status(StatusCodes.FORBIDDEN)
          .json({ error: 'This module is part of another company\'s roadmap which you are not a part of' } );
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        // eslint-disable-next-line max-len
        .json({ error: 'An error occurred while validating the relationship between the module and the company roadmap ' });
  }
};

export default isCompanyModule;
