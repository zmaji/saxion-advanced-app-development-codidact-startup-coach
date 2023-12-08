import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import authController from '../controllers/Auth';

const router = Router();

router.post('', async (req: Request, res: Response) => {
  try {
    const { userName, emailAddress, password } = req.body;

    if((!userName && !emailAddress) || !password) {
      res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'Missing required fields' });
    }

    const token = await authController.authenticateUser(userName, emailAddress, password);

    if (token) {
      res
          .status(StatusCodes.OK)
          .json({ token });
    } else {
      res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('An error occurred authenticating a user:', error);
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred' });
  }
});

export default router;
