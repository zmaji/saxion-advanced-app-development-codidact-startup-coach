import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CompanyAnalysisController from '../controllers/CompanyAnalysisController';

const router = Router();

router.get('', async (req: Request, res: Response) => {
  try {
    const result = await CompanyAnalysisController.getCompanyAnalyses();

    if (result) {
      res
          .status(StatusCodes.OK)
          .json(result);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Unable to find company analyses' });
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred getting all company anlyses' });
  }
});

router.get('/:companyAnalysisID', async (req: Request, res: Response) => {
  try {
    const result = await CompanyAnalysisController.getCompanyAnalysis(req.params.companyAnalysisID);

    if (result) {
      res
          .status(StatusCodes.OK)
          .json(result);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: `Unable to find company analysis with ID ${req.params.companyAnalysisID}` });
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred getting a company analysis' });
  }
});

export default router;
