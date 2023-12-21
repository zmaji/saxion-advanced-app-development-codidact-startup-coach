import type { Content } from '../typings/Content';
import type { ContentUser } from '../typings/User';

import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import contentModel from '../models/Content';
import contentUserModel from '../models/ContentUser';

const isReviewer = async (req: Request, res: Response, next: NextFunction) => {
  const contentID = req.params.contentID;
  const userID = req.user?.userID;

  try {
    const content: Content | null = await contentModel.findOne({ contentID: contentID });

    if (!content) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Content not found' });

      return;
    }

    const isContentOwner = content.userID === userID;

    if (isContentOwner) {
      next();
    } else {
      res
          .status(StatusCodes.FORBIDDEN)
          .json({ error: 'You do not have permission to add reviewers to this content' });
    }
  } catch (error) {
    console.error('Error checking content ownership status:', error);
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred checking content ownership status' });
  }
};

export default isReviewer;
