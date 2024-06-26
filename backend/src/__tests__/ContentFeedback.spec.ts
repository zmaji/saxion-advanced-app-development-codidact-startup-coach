import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { app } from './config/setupFile';
import { loginAsUser } from './utils/login';

describe('Content', () => {
  describe('POST /feedback/:contentID', () => {
    const contentID = 'ea0abe91-b28d-47d0-a6ac-e9e4e3e8a8ae';

    it('should block unauthenticated users from posting feedback', async () => {
      const response = await request(app)
          .post(`/feedback/${contentID}`)
          .send({
            feedback: 'Very nice',
          });

      expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    });

    it('should block authenticated users that are not reviewers of selected content from posting feedback', async () => {
      const token = await loginAsUser(app, 'Alex', 'Maurice123');

      const response = await request(app)
          .post(`/feedback/${contentID}`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            feedback: 'Very nice',
          });

      expect(response.status).toBe(StatusCodes.FORBIDDEN);
    });

    it('should return the posted feedback on successful post', async () => {
      const token = await loginAsUser(app, 'Maurice', 'Maurice123');

      const response = await request(app)
          .post(`/feedback/${contentID}`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            feedback: 'Very nice',
          });

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual({
        contentID: contentID,
        feedback: 'Very nice',
        ...response.body,
      });
    });
  });
});
