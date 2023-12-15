import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import userController from '../controllers/User';
import isLoggedIn from '../middleware/isLoggedIn';

const router = Router();

router.get('/', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const result = await userController.getAllUsers();

    if (result) {
      res
          .status(StatusCodes.OK)
          .json(result);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Unable to get users' });
    }
  } catch {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred getting all users' });
  }
});

export default router;
