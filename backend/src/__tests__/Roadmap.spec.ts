import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { existingRoadmapData, newlyCreatedRoadmap } from './mocks/data/Roadmap';
import { app } from './config/setupFile';
import { loginAsUser } from './utils/login';

describe('GET /roadmaps/companyRoadmap', () => {
  it('should return an a newly generated roadmap if none exist and analysis is done',
      async () => {
        const token = await loginAsUser(app, 'Zikria', 'Zikria123');

        const response = await request(app)
            .get(`/roadmaps/companyRoadmap`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.modules).toHaveLength(newlyCreatedRoadmap.modules.length);
        expect(response.body.description).toEqual(newlyCreatedRoadmap.description);
      });

  it('should return an existing roadmap',
      async () => {
        const token = await loginAsUser(app, 'Zikria4', 'Zikria123');

        const response = await request(app)
            .get(`/roadmaps/companyRoadmap`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toEqual(existingRoadmapData);
      });

  it('should handle a user who is not logged in', async () => {
    const response = await request(app).get(`/roadmaps/companyRoadmap`);

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body).toEqual({ error: 'Authentication required' });
  });

  it('should handle users with no company', async () => {
    const token = await loginAsUser(app, 'Zikria2', 'Zikria123');

    const response = await request(app)
        .get(`/roadmaps/companyRoadmap`)
        .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(StatusCodes.FORBIDDEN);
    expect(response.body).toEqual({ error: 'User is not linked to a company or companyID is invalid' });
  });
});

