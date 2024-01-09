import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import answerController from '../controllers/Answer';

const router = Router();

router.get('', async (req: Request, res: Response) => {
  try {
    const result = await answerController.getAnswers();

    if (result) {
      res
        .status(StatusCodes.OK)
        .json(result);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Unable to find answers' });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred getting all answers' });
  }
});

export default router;
