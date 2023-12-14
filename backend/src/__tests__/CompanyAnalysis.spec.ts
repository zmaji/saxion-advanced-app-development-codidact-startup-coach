import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { companyAnalysesIndexData } from './mocks/data/CompanyAnalyses';
import { app } from './config/setupFile';

describe('CompanyAnalysis', () => {
  describe('GET /companyAnalyses', () => {
    it('should return a list of company analyses', async () => {
      const response = await request(app).get('/companyAnalyses');

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(companyAnalysesIndexData);
    });
  });
});

describe('GET /companyAnalyses/:companyAnalysisID', () => {
  it('should return a specific company analysis', async () => {
    const response = await request(app).get(`/companyAnalyses/${companyAnalysesIndexData[0].companyAnalysisID}`);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual(companyAnalysesIndexData[0]);
  });

  it('should handle an invalid companyAnalysisID', async () => {
    const invalidArticleID = 'invalid-id';
    const response = await request(app).get(`/companyAnalyses/${invalidArticleID}`);

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body).toEqual({ error: 'Unable to find company analysis with ID invalid-id' });
  });
});

describe('POST /companyAnalyses', () => {
  it('should create a new company analysis', async () => {
    const newCompanyAnalysisData = {
      industry: 'Sample industry',
      serviceInformation: 'Sample service information',
      nrOfEmployees: 1,
      stage: 'Start-up',
      businessGoals: [
        'Sample business goal 1', 'Sample business Goal 2',
      ],
      painPoints: [
        'Sample pain point 1', 'Sample pain point 2',
      ],
      competitors: [
        'Sample competitor 1', 'Sample competitor 2',
      ],
      targetAudience: 'Sample target audience',
      budget: 100000,
    };

    const response = await request(app)
        .post('/companyAnalyses')
        .send(newCompanyAnalysisData);
    const { companyAnalysisID } = response.body;

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body).toEqual({
      companyAnalysisID: companyAnalysisID,
      ...newCompanyAnalysisData,
    });
  });

  it('should handle errors during company analysis creation', async () => {
    const newCompanyAnalysisData = {
      industry: 'Sample industry',
      serviceInformation: 'Sample service information',
    };

    const response = await request(app)
        .post('/companyAnalyses')
        .send(newCompanyAnalysisData);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toEqual({ error: 'Fields were not filled in properly' });
  });
});
