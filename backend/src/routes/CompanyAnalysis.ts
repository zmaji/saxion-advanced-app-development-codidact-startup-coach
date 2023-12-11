import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CompanyAnalysis from '../controllers/CompanyAnalysis';

const router = Router();

router.get('', async (req: Request, res: Response) => {
  try {
    const result = await CompanyAnalysis.getCompanyAnalyses();

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
    const result = await CompanyAnalysis.getCompanyAnalysis(req.params.companyAnalysisID);

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

router.post('', async (req: Request, res: Response) => {
  try {
    const companyAnalysis = await CompanyAnalysis.createCompanyAnalysis(req.body);

    if (companyAnalysis) {
      res.status(StatusCodes.CREATED).json(companyAnalysis);
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create company analysis' });
    }
  } catch (error) {
    console.error('Error creating company analysis:', error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Fields were not filled in properly' });
  }
});

export default router;
