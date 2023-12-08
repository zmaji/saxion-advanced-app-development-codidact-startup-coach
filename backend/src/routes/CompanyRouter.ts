import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CompanyController from '../controllers/CompanyController';

const router = Router();

router.get('', async (req: Request, res: Response) => {
  try {
    const result = await CompanyController.getCompanies();

    if (result) {
      res
        .status(StatusCodes.OK)
        .json(result);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Unable to find companies' });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred getting all companies' });
  }
});

router.get('/:companyID', async (req: Request, res: Response) => {
  try {
    const result = await CompanyController.getCompany(req.params.companyID);

    if (result) {
      res
        .status(StatusCodes.OK)
        .json(result);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Unable to find company with ID ${req.params.companyID}` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred getting a company' });
  }
});

router.put('/:companyID', async (req: Request, res: Response) => {
  try {
    const updatedCompany = await CompanyController.updateCompany(req.params.companyID, req.body);

    if (updatedCompany) {
      res
        .status(StatusCodes.OK)
        .json(updatedCompany);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Unable to update company with ID ${req.params.companyID}` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred updating a company' });
  }
});

export default router;
