import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { companiesIndexData } from './mocks/data/Companies';
import { app } from './config/setupFile';

describe('Company', () => {
  describe('GET /companies', () => {
    it('should return a list of companies', async () => {
      const response = await request(app).get('/companies');

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(companiesIndexData);
    });
  });
});

describe('GET /companies/:companyID', () => {
  it('should return a specific company', async () => {
    const response = await request(app).get(`/companies/${companiesIndexData[0].companyID}`);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual(companiesIndexData[0]);
  });

  it('should handle an invalid companyID', async () => {
    const invalidCompanyID = 'invalid-id';
    const response = await request(app).get(`/companies/${invalidCompanyID}`);

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body).toEqual({ error: 'Unable to find company with ID invalid-id' });
  });
});
