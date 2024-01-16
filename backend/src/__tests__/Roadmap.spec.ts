import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { existingRoadmapData, newlyCreatedRoadmap } from './mocks/data/Roadmap';
import { app } from './config/setupFile';

describe('GET /roadmaps/companyRoadmap', () => {
  it('should return an a newly generated roadmap if none exist and analysis is done',
      async () => {
        const loginResponse = await request(app)
            .post('/credentials')
            .send({
              userName: 'Zikria',
              password: 'Zikria123',
            });

        const response = await request(app)
            .get(`/roadmaps/companyRoadmap`)
            .set('Authorization', `Bearer ${loginResponse.body.token}`);

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.modules).toHaveLength(newlyCreatedRoadmap.modules.length);
        expect(response.body.description).toEqual(newlyCreatedRoadmap.description);
      });

  it('should return an existing roadmap',
      async () => {
        const loginResponse = await request(app)
            .post('/credentials')
            .send({
              userName: 'Zikria4',
              password: 'Zikria123',
            });

        const response = await request(app)
            .get(`/roadmaps/companyRoadmap`)
            .set('Authorization', `Bearer ${loginResponse.body.token}`);

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toEqual(existingRoadmapData);
      });

  it('should handle a user who is not logged in', async () => {
    const response = await request(app).get(`/roadmaps/companyRoadmap`);

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body).toEqual({ error: 'Authentication required' });
  });

  it('should handle users with no company', async () => {
    const loginResponse = await request(app)
        .post('/credentials')
        .send({
          userName: 'Zikria2',
          password: 'Zikria123',
        });

    const response = await request(app)
        .get(`/roadmaps/companyRoadmap`)
        .set('Authorization', `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(StatusCodes.FORBIDDEN);
    expect(response.body).toEqual({ error: 'User is not linked to a company or companyID is invalid' });
  });
});

