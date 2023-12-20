import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import roadmapController from '../controllers/Roadmap';

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

export default router;
