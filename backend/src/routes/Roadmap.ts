import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import roadmapController from '../controllers/Roadmap';
import isLoggedIn from '../middleware/isLoggedIn';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await roadmapController.getAllRoadmaps();

    if (result) {
      res
          .status(StatusCodes.OK)
          .json(result);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Unable to find roadmaps' });
    }
  } catch {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred getting all roadmaps' });
  }
});

router.get('/companyRoadmap', isLoggedIn, async (req: Request, res: Response) => {
  try {
    if (req.headers.authorization) {
      const result = await roadmapController.getRoadmap(req.headers.authorization);

      if (result) {
        res
            .status(StatusCodes.OK)
            .json(result);
      } else if (result === null) {
        res
            .status(StatusCodes.FORBIDDEN)
            .json({ error: 'User is not linked to a company or companyID is invalid' });
      } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: 'Unable to find requested roadmap' });
      }
    } else {
      res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ error: 'User is not logged in' });
    }
  } catch (error) {
    console.error('Something went wrong getting requested:', error);
    throw error;
  }
});

export default router;
