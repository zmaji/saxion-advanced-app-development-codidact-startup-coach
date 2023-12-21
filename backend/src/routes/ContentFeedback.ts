import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import isLoggedIn from '../middleware/isLoggedIn';
import isReviewer from '../middleware/isReviewer';
import contentFeedbackController from '../controllers/ContentFeedback';

const router = Router();

router.post('/:contentID', isLoggedIn, isReviewer, async (req: Request, res: Response) => {
  try {
    if (req.headers.authorization) {
      const result = await contentFeedbackController.addFeedback(
          req.params.contentID,
          req.headers.authorization,
          req.body,
      );

      if (result) {
        res
            .status(StatusCodes.OK)
            .json(result);
      } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: 'Unable to add feedback' });
      }
    }
  } catch {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred adding new feedback to content' });
  }
});

export default router;
