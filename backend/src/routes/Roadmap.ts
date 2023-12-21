import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import roadmapController from '../controllers/Roadmap';
import { Company } from '../typings/Company';
import CompanyModel from '../models/Company';
import jwt from 'jsonwebtoken';
import { User } from '../typings/User';

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

router.get('/:roadmapID', async (req: Request, res: Response) => {
  try {
    const requestedRoadmap = req.params.roadmapID;
    const userToken: string = req.headers.authorization!.split(' ')[1];
    const user = jwt.decode(userToken) as User | null;

    if (!user) {
      return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ error: 'You must login first' });
    }

    const company: Company | null = await CompanyModel.findOne(
        { companyID: user.company },
        { _id: 0 },
    ).lean();

    if (!company || company.roadmap !== requestedRoadmap) {
      const statusCode = !company ? StatusCodes.NOT_FOUND : StatusCodes.FORBIDDEN;
      const errorMessage = !company ? 'Unable to find user company' :
        'An error occurred, company roadmap and requested roadmap are not qual';

      return res
          .status(statusCode)
          .json({ error: errorMessage });
    }

    const result = await roadmapController.getRoadmap(company.roadmap);

    if (result) {
      res
          .status(StatusCodes.OK)
          .json(result);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Unable to find requested roadmap' });
    }
  } catch (error) {
    console.error('Something went wrong getting requested:', error);
    throw error;
  }
});

export default router;
