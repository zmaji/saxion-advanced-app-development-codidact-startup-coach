import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import isLoggedIn from '../middleware/isLoggedIn';
import contentUserController from '../controllers/ContentUser';

const router = Router();

router.post('/:contentID', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const result = await contentUserController.addContentUsers(req.params.contentID, req.body);

    if (result) {
      res
          .status(StatusCodes.OK)
          .json(result);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Unable to add users' });
    }
  } catch {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred adding new users to content' });
  }
});

export default router;
