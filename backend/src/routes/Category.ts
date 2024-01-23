import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import categoryController from '../controllers/Category';
import isLoggedIn from '../middleware/isLoggedIn';

const router = Router();

router.get('', isLoggedIn, async (req: Request, res: Response) => {
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

router.get('/flattened', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const result = await categoryController.getAllFlattenedCategories();

    if (result) {
      res.status(StatusCodes.OK).json(result);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Unable to find all flattened categories' });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred getting all flattened categories' });
  }
});

router.get('/:categoryID/parents', isLoggedIn, async (req: Request, res: Response) => {
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

router.get('/:categoryID', isLoggedIn, async (req: Request, res: Response) => {
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

router.get('/:parentCategoryID/subcategories', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const { parentCategoryID } = req.params;
    const result = await categoryController.getSubcategoriesByParentId(parentCategoryID);

    if (result) {
      res.status(StatusCodes.OK).json({ currentCategory: result });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Unable to find subcategories by parent ID' });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'An error occurred getting subcategories by parent ID',
    });
  }
});

export default router;
