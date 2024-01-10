import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { analysisSectionIndexData } from './mocks/data/AnalysisSections';
import { questionSetsIndexData } from './mocks/data/QuestionSets';
import { questionsIndexData } from './mocks/data/Questions';
import { questionOptionsIndexData } from './mocks/data/QuestionOptions';
import { app } from './config/setupFile';

describe('AnalysisSection', () => {
  describe('GET /analysisSections', () => {
    it('should return a list of analysis sections', async () => {
      const loginResponse = await request(app)
          .post('/credentials')
          .send({
            userName: 'Maurice',
            password: 'Maurice123',
          });

      const response = await request(app)
          .get('/analysisSections')
          .set('Authorization', `Bearer ${loginResponse.body.token}`);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(analysisSectionIndexData);
    });
  });
});

describe('GET /analysisSections/:analysisSectionID', () => {
  it('should return a specific analysis section', async () => {
    const loginResponse = await request(app)
        .post('/credentials')
        .send({
          userName: 'Maurice',
          password: 'Maurice123',
        });

    const response = await request(app)
        .get(`/analysisSections/${analysisSectionIndexData[0].analysisSectionID}`)
        .set('Authorization', `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response?.body.analysisSectionID).toBe(analysisSectionIndexData[0].analysisSectionID);
    expect(response?.body.title).toBe(analysisSectionIndexData[0].title);
    expect(response?.body.description).toBe(analysisSectionIndexData[0].description);
    expect(response?.body.questionSets).not.toBeNull();
    expect(response?.body.questionSets[0].questions).not.toBeNull();
    expect(response?.body.questionSets[0].questions[0].questionOptions).not.toBeNull();

    // @ts-ignore
    response?.body.questionSets.forEach((questionSet) => {
      const matchedQuestionSet = questionSetsIndexData.find((q) => q.questionSetID === questionSet.questionSetID);
      expect(matchedQuestionSet).toBeDefined();
    });

    // @ts-ignore
    response?.body.questionSets[0].questions.forEach((question) => {
      const matchedQuestion = questionsIndexData.find((q) => q.questionID === question.questionID);
      expect(matchedQuestion).toBeDefined();
    });

    // @ts-ignore
    response?.body.questionSets[0].questions[0].questionOptions.forEach((questionOption) => {
      const matchedQuestionOption = questionOptionsIndexData.find((q) => q.questionOptionID === questionOption.questionOptionID);
      expect(matchedQuestionOption).toBeDefined();
    });
  });

  it('should handle an invalid analysisSectionID', async () => {
    const invalidAnalysisSectionID = 'invalid-id';

    const loginResponse = await request(app)
        .post('/credentials')
        .send({
          userName: 'Maurice',
          password: 'Maurice123',
        });

    const response = await request(app)
        .get(`/analysisSections/${invalidAnalysisSectionID}`)
        .set('Authorization', `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body).toEqual({ error: `Unable to find analysis section with ID ${invalidAnalysisSectionID}` });
  });
});
