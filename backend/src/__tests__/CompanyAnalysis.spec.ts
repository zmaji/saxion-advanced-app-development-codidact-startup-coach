import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { companyAnalysesIndexData } from './mocks/data/CompanyAnalyses';
import { questionsIndexData } from './mocks/data/Questions';
import { app } from './config/setupFile';

describe('CompanyAnalysis', () => {
  describe('GET /companyAnalyses', () => {
    it('should return a list of company analyses', async () => {
      const loginResponse = await request(app)
          .post('/credentials')
          .send({
            userName: 'Maurice',
            password: 'Maurice123',
          });

      const response = await request(app)
          .get('/companyAnalyses')
          .set('Authorization', `Bearer ${loginResponse.body.token}`);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(companyAnalysesIndexData);
    });
  });
});

describe('GET /companyAnalyses/:companyAnalysisID', () => {
  it('should return a specific company analysis', async () => {
    const loginResponse = await request(app)
        .post('/credentials')
        .send({
          userName: 'Maurice',
          password: 'Maurice123',
        });

    const response = await request(app)
        .get(`/companyAnalyses/${companyAnalysesIndexData[0].companyAnalysisID}`)
        .set('Authorization', `Bearer ${loginResponse.body.token}`);

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

    const loginResponse = await request(app)
        .post('/credentials')
        .send({
          userName: 'Maurice',
          password: 'Maurice123',
        });

    const response = await request(app)
        .get(`/companyAnalyses/${invalidCompanyAnalysisID}`)
        .set('Authorization', `Bearer ${loginResponse.body.token}`);

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
          linkedQuestionID: 'fd446cdc-5871-4a5c-9f2a-34cf285c1a6f',
        },
        {
          answerID: '',
          companyAnalysisID: '',
          selectedOption: 'a86c5c3a-e874-4b2e-8ff2-cd8d89839bfb',
          linkedQuestionID: '0f22c869-10a2-4d16-b9d3-21a0df04d09b',
        },
        {
          answerID: '',
          companyAnalysisID: '',
          selectedOption: '92aa4b69-e8e6-408d-b130-cf466bb95b08',
          linkedQuestionID: 'eb55ce5f-63f5-4927-a897-0f1c4a758e02',
        },
        {
          answerID: '',
          companyAnalysisID: '',
          selectedOption: '794b96f3-263c-475e-9f94-4314712a0d92',
          linkedQuestionID: '9367fe56-6a12-4c06-b90b-7f39c4069d15',
        },
      ],
    };

    const loginResponse = await request(app)
        .post('/credentials')
        .send({
          userName: 'Maurice',
          password: 'Maurice123',
        });

    const response = await request(app)
        .post('/companyAnalyses')
        .set('Authorization', `Bearer ${loginResponse.body.token}`)
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

    const loginResponse = await request(app)
        .post('/credentials')
        .send({
          userName: 'Maurice',
          password: 'Maurice123',
        });

    const response = await request(app)
        .post('/companyAnalyses')
        .set('Authorization', `Bearer ${loginResponse.body.token}`)
        .send(newCompanyAnalysisData);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toEqual({ error: 'Fields were not filled in properly' });
  });
});
