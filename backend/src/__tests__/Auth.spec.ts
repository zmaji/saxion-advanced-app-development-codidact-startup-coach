import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { app } from './config/setupFile';

describe('POST /credentials', () => {
  it('should authenticate a user and return a token', async () => {
    const user = {
      userName: 'Zikria',
      emailAddress: 'zikria@saxion.nl',
      password: 'Zikria123',
    };

    const response = await request(app).post('/credentials').send(user);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toHaveProperty('token');
  });

  it('should return a 400 error for missing required fields', async () => {
    const user = {
      emailAddress: 'zikria@saxion.nl',
    };

    const response = await request(app).post('/credentials').send(user);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toEqual({ error: 'Missing required fields' });
  });

  it('should return a 401 error for invalid credentials', async () => {
    const user = {
      userName: 'Zikria',
      emailAddress: 'zikria@saxion.nl',
      password: 'wrongpassword',
    };

    const response = await request(app).post('/credentials').send(user);

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body).toEqual({ error: 'Invalid credentials' });
  });
});
