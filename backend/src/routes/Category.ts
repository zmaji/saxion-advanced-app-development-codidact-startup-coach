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

router.get('/:categoryID/parents', async (req: Request, res: Response) => {
  try {
    const { categoryID } = req.params;
    const result = await categoryController.getAllParentCategories(categoryID);

    if (result) {
      res.status(StatusCodes.OK).json(result);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Unable to find parent categories' });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred getting parent categories' });
  }
});

router.get('/:categoryID', async (req: Request, res: Response) => {
    try {
      const { categoryID } = req.params;
      const result = await categoryController.getCategoryById(categoryID);
  
      if (result) {
        res.status(StatusCodes.OK).json(result);
      } else {
        res.status(StatusCodes.NOT_FOUND).json({ error: 'Unable to find category by ID' });
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred getting category by ID' });
    }
  });

export default router;
