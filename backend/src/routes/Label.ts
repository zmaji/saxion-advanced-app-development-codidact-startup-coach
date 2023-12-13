import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import labelController from '../controllers/Label';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await labelController.getAllLabels();

    if (result) {
      res
          .status(StatusCodes.OK)
          .json(result);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Unable to find labels' });
    }
  } catch {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred getting all labels' });
  }
});

router.get('/:labelID', async (req: Request, res: Response) => {
  try {
    const result = await labelController.getLabel(req.params.labelID);

    if (result) {
      res
          .status(StatusCodes.OK)
          .json(result);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Unable to find requested label' });
    }
  } catch {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred getting requested label' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const result = await labelController.createLabel(req.body);

    if (result) {
      res
          .status(StatusCodes.OK)
          .json(result);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Unable to add new label' });
    }
  } catch {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred adding new label' });
  }
});

export default router;
