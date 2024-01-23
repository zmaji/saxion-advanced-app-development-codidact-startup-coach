import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import companyController from '../controllers/Company';
import isLoggedIn from '../middleware/isLoggedIn';

const router = Router();

router.get('', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const result = await companyController.getCompanies();

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

router.get('/:companyID', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const result = await companyController.getCompany(req.params.companyID);

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

router.put('/:companyID', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const updatedCompany = await companyController.updateCompany(req.params.companyID, req.body);

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
