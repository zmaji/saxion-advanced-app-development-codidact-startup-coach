import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { app } from './config/setupFile';
import { contentsIndexData, contentsSingleContent } from './mocks/data/Contents';
import { loginAsUser } from './utils/login';

describe('Content', () => {
  describe('GET /content', () => {
    it('should return a list of content', async () => {
      const token = await loginAsUser(app, 'Maurice', 'Maurice123');
      const response = await request(app)
          .get('/content')
          .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(contentsIndexData);
    });
  });
});

describe('GET /content/:contentID', () => {
  it('should return a specific content', async () => {
    const token = await loginAsUser(app, 'Maurice', 'Maurice123');
    const response = await request(app)
        .get(`/content/${contentsSingleContent.contentID}`)
        .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual(contentsSingleContent);
  });

  it('should handle an invalid contentID', async () => {
    const invalidContentID = 'invalid-id';
    const token = await loginAsUser(app, 'Maurice', 'Maurice123');

    const response = await request(app)
        .get(`/content/${invalidContentID}`)
        .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body).toEqual({ error: 'Unable to find content with ID invalid-id' });
  });
});
