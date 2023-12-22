import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { roadmapIndexData } from './mocks/data/Roadmap';
import { app } from './config/setupFile';

describe('GET /roadmaps/companyRoadmap', () => {
  it('should return the roadmap of the user that is logged in', async () => {
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
});

