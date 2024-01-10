import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { companyAnalysesIndexData } from './mocks/data/CompanyAnalyses';
import { questionsIndexData } from './mocks/data/Questions';
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
    expect(response?.body.companyAnalysisID).toBe(companyAnalysesIndexData[0].companyAnalysisID);
    expect(response?.body.phase).toBe(companyAnalysesIndexData[0].phase);
    expect(response?.body.answers).not.toBeNull();

    // @ts-ignore
    response?.body.answers.forEach((answer) => {
      const matchedQuestion = questionsIndexData.find((question) => question.title === answer.question.title);
      expect(matchedQuestion).toBeDefined();
    });
  });

  it('should handle an invalid companyAnalysisID', async () => {
    const invalidCompanyAnalysisID = 'invalid-id';
    const response = await request(app).get(`/companyAnalyses/${invalidCompanyAnalysisID}`);

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body).toEqual({ error: `Unable to find company analysis with ID ${invalidCompanyAnalysisID}` });
  });
});

describe('POST /companyAnalyses', () => {
  it('should create a new company analysis and answers', async () => {
    const newCompanyAnalysisData = {
      phase: 'Pre-startup',
      answers: [
        {
          answerID: '',
          companyAnalysisID: '',
          selectedOption: 'cf907c23-21a6-4ea3-b6b7-621442312a8d',
        },
        {
          answerID: '',
          companyAnalysisID: '',
          selectedOption: '1fbb3de0-5b10-4f13-b6f9-7fbd93c2d276',
        },
        {
          answerID: '',
          companyAnalysisID: '',
          selectedOption: '3fe52771-6b3b-47e8-b0b4-83f0d8b65466',
        },
        {
          answerID: '',
          companyAnalysisID: '',
          selectedOption: '40d1be91-cd27-4611-8ea3-baeb4f68d74e',
        },
      ],
    };

    const response = await request(app)
        .post('/companyAnalyses')
        .send(newCompanyAnalysisData);
    const { companyAnalysisID } = response.body;

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body).toEqual({
      companyAnalysisID: companyAnalysisID,
      phase: newCompanyAnalysisData.phase,
    });
  });

  it('should handle errors during company analysis creation', async () => {
    const newCompanyAnalysisData = {
      answers: [],
    };

    const response = await request(app)
        .post('/companyAnalyses')
        .send(newCompanyAnalysisData);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toEqual({ error: 'Fields were not filled in properly' });
  });
});
