import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import isLoggedIn from '../middleware/isLoggedIn';
import moduleController from '../controllers/Module';
import isCompanyModule from '../middleware/isCompanyModule';

const router = Router();

router.get('/:moduleID', isLoggedIn, isCompanyModule, async (req: Request, res: Response) => {
  try {
    if (req.headers.authorization) {
      const result = await moduleController.getModule(
          req.params.moduleID,
      );

      if (result) {
        res
            .status(StatusCodes.OK)
            .json(result);
      } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: `Unable to find module with ID ${req.params.moduleID}` });
      }
    }
  } catch {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred getting requested content' });
  }
});

export default router;
