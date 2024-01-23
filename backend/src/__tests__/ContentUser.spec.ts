import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { app } from './config/setupFile';
import { loginAsUser } from './utils/login';

describe('Content', () => {
  describe('POST /contentUsers/:contentID', () => {
    const contentID = 'ea0abe91-b28d-47d0-a6ac-e9e4e3e8a8ae';
    const contentUserID = '56823d1b-c117-408b-a52b-af03de9dcc07';

    it('should block unauthenticated users from adding reviewers to content', async () => {
      const response = await request(app)
          .post(`/contentUsers/${contentID}`)
          .send([
            {
              userID: contentUserID,
            },
          ]);

      expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    });

    it('should block authenticated users that are the owner of selected content from adding reviewers', async () => {
      const token = await loginAsUser(app, 'Maurice', 'Maurice123');

      const response = await request(app)
          .post(`/contentUsers/${contentID}`)
          .set('Authorization', `Bearer ${token}`)
          .send([
            {
              userID: contentUserID,
            },
          ]);
          
      expect(response.status).toBe(StatusCodes.FORBIDDEN);
    });

    it('should return the posted contentUser on successful post', async () => {
      const token = await loginAsUser(app, 'Zikria', 'Zikria123');

      const response = await request(app)
          .post(`/contentUsers/${contentID}`)
          .set('Authorization', `Bearer ${token}`)
          .send([
            {
              userID: contentUserID,
            },
          ]);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual([
        {
          userID: contentUserID,
          contentID: contentID,
          accessLevel: 'review',
        },
      ]);
    });
  });
});
