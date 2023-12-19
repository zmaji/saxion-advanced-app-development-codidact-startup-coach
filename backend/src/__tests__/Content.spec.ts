import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { app } from './config/setupFile';
import { contentsIndexData, contentsSingleContent } from './mocks/data/Contents';

describe('Content', () => {
  describe('GET /content', () => {
    it('should return a list of content', async () => {
      const response = await request(app).get('/content');

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(contentsIndexData);
    });
  });
});

describe('GET /content/:contentID', () => {
  it('should return a specific content', async () => {
    const response = await request(app).get(`/content/${contentsSingleContent.contentID}`);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual(contentsSingleContent);
  });

  it('should handle an invalid contentID', async () => {
    const invalidContentID = 'invalid-id';
    const response = await request(app).get(`/content/${invalidContentID}`);

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body).toEqual({ error: 'Unable to find content with ID invalid-id' });
  });
});
