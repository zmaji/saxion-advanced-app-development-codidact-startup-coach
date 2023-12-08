import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Auth from '../controllers/Auth';

const router = Router();

router.post('', async (req: Request, res: Response) => {
  try {
    const { userName, emailAddress, password } = req.body;
    const token = await Auth.authenticateUser(userName, emailAddress, password);

    if (token) {
      res
          .status(StatusCodes.OK)
          .json({ token });
    } else {
      res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ error: req.body.userName });
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred' });
  }
});

export default router;
