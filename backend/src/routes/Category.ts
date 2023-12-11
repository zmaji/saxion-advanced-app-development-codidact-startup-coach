import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import categoryController from '../controllers/Category';

const router = Router();

router.get('', async (req: Request, res: Response) => {
  try {
    const result = await categoryController.getAllCategories();

    if (result) {
      res
          .status(StatusCodes.OK)
          .json(result);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Unable to find all categories' });
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred getting all categories' });
  }
});

export default router;
