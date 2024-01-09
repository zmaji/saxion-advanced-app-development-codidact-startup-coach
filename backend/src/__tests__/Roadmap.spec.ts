import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { roadmapIndexData } from './mocks/data/Roadmap';
import { app } from './config/setupFile';

describe('GET /roadmaps/companyRoadmap', () => {
  it('should return the roadmap with modules and steps of the user that is logged in',
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
        expect(response.body).toEqual(roadmapIndexData[0]);
      });

  it('should return the roadmap with no modules of the user that is logged in'
      , async () => {
        const loginResponse = await request(app)
            .post('/credentials')
            .send({
              userName: 'Maurice',
              password: 'Maurice123',
            });

        const response = await request(app)
            .get(`/roadmaps/companyRoadmap`)
            .set('Authorization', `Bearer ${loginResponse.body.token}`);

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toEqual(roadmapIndexData[1]);
      });

  it('should handle a user who is not logged in', async () => {
    const response = await request(app).get(`/roadmaps/companyRoadmap`);

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body).toEqual({ error: 'Authentication required' });
  });

  it('should handle an invalid companyID', async () => {
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

  it('should handle an invalid roadmapID', async () => {
    const loginResponse = await request(app)
        .post('/credentials')
        .send({
          userName: 'Zikria3',
          password: 'Zikria123',
        });

    const response = await request(app)
        .get(`/roadmaps/companyRoadmap`)
        .set('Authorization', `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(StatusCodes.FORBIDDEN);
    expect(response.body).toEqual({ error: 'User is not linked to a company or companyID is invalid' });
  });
});

