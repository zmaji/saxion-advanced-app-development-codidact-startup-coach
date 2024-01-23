import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { app } from './config/setupFile';
import { moduleDetailData } from './mocks/data/Modules';
import { loginAsUser } from './utils/login';

describe('GET /modules/:moduleID', () => {
  const moduleID = 'a76e8fd1-f74d-4d2f-911c-ef625d999036';

  it('should handle an unauthenticatied user',
      async () => {
        const response = await request(app)
            .get(`/modules/${moduleID}`);

        expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
      });

  it('should return a module based on moduleID',
      async () => {
        const token = await loginAsUser(app, 'Maurice', 'Maurice123');

        const response = await request(app)
            .get(`/modules/${moduleID}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toEqual(moduleDetailData);
      });

  it('should handle incorrect moduleID',
      async () => {
        const token = await loginAsUser(app, 'Zikria', 'Zikria123');

        const response = await request(app)
            .get(`/modules/InvalidID`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(StatusCodes.NOT_FOUND);
        expect(response.body).toEqual({ error: 'Module not found' });
      });

  it('should handle a user who is not a member of company',
      async () => {
        const token = await loginAsUser(app, 'Zikria', 'Zikria123');

        const response = await request(app)
            .get(`/modules/${moduleID}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(StatusCodes.FORBIDDEN);
        expect(response.body).toEqual({ error: 'This module is part of another company\'s roadmap which you are not a part of' });
      });
});
