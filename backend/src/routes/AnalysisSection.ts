import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import analysisSectionController from '../controllers/AnalysisSection';
import isLoggedIn from '../middleware/isLoggedIn';

const router = Router();

router.get('', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const result = await analysisSectionController.getAnalysisSections();

    if (result) {
      res
          .status(StatusCodes.OK)
          .json(result);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Unable to find analysis sections' });
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred getting all analysis sections' });
  }
});

router.get('/:analysisSectionID', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const result = await analysisSectionController.getAnalysisSection(req.params.analysisSectionID);

    if (result) {
      res
          .status(StatusCodes.OK)
          .json(result);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: `Unable to find analysis section with ID ${req.params.analysisSectionID}` });
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred getting an analysis section' });
  }
});

export default router;
