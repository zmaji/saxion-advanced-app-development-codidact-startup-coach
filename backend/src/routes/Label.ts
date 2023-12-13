import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import labelController from '../controllers/Label';

const router = Router();

router.get('', async (req: Request, res: Response) => {
  try {
    const result = await labelController.getAllLabels();

    if (result) {
      res
          .status(StatusCodes.OK)
          .json(result);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Unable to find all labels' });
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred getting all labels' });
  }
});

export default router;
