import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import isLoggedIn from '../middleware/isLoggedIn';
import isReviewer from '../middleware/isReviewer';
import feedbackController from '../controllers/Feedback';

const router = Router();

router.post('/:contentID', isLoggedIn, isReviewer, async (req: Request, res: Response) => {
  try {
    const result = await feedbackController.addFeedback(req.params.contentID, req.body);

    if (result) {
      res
          .status(StatusCodes.OK)
          .json(result);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Unable to add feedback' });
    }
  } catch {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred adding new feedback to content' });
  }
});

export default router;
