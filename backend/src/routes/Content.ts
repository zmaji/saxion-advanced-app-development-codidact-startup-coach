import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import contentController from '../controllers/Content';
import isLoggedIn from '../middleware/isLoggedIn';

const router = Router();

router.get('/', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const { title, labels, category } = req.query;

    const result = await contentController.getAllContent(
      title as string,
      labels as string[],
      category as string,
    );

    if (result) {
      res
          .status(StatusCodes.OK)
          .json(result);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Unable to find content' });
    }
  } catch {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred getting all content' });
  }
});

router.get('/:contentID', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const result = await contentController.getContent(req.params.contentID);

    if (result) {
      res.status(StatusCodes.OK).json(result);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: `Unable to find content with ID ${req.params.contentID}` });
    }
  } catch {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred getting requested content' });
  }
});

router.post('/', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const newContent = await contentController.createContent(req.body, req.files);

    if (newContent) {
      res
          .status(StatusCodes.OK)
          .json(newContent);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Unable to ceate content' });
    }
  } catch {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred creating content' });
  }
});

router.put('/:contentID', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const updatedContent = await contentController.updateContent(req.params.contentID, req.body);

    if (updatedContent) {
      res
          .status(StatusCodes.OK)
          .json(updatedContent);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Unable to find content' });
    }
  } catch {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred getting editing content' });
  }
});

router.delete('/:contentID', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const deletedContent = await contentController.deleteContent(req.params.contentID);

    if (deletedContent) {
      res
          .status(StatusCodes.OK)
          .json(deletedContent);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Unable to find content' });
    }
  } catch {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred deleting content' });
  }
});

export default router;
