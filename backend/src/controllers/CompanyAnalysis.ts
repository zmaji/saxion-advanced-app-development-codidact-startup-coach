import type { CompanyAnalysis } from '../typings/CompanyAnalysis';

import companyAnalysisModel from '../models/CompanyAnalysis';
import answerModel from '../models/Answer';
import questionOptionModel from '../models/QuestionOption';
import questionModel from '../models/Question';
import questionSetModel from '../models/QuestionSet';
import { v4 as uuidv4 } from 'uuid';
import { removeIdField } from '../helpers/removeMongoID';
import { Answer } from '../typings/Answer';

const getCompanyAnalyses = async (): Promise<CompanyAnalysis[]> => {
  try {
    return await companyAnalysisModel.find({}, { _id: 0 });
  } catch (error) {
    console.error('Something went wrong getting company analyses:', error);
    throw error;
  }
};

/**
 * Retrieves a specific company analysis by its ID, including associated answers and question details.
 *
 * @param {string} companyAnalysisID - The ID of the company analysis to retrieve.
 * @return {Promise<CompanyAnalysis | null>} A promise that resolves to a CompanyAnalysis object or null if not found.
 */
const getCompanyAnalysis = async (companyAnalysisID: string): Promise<CompanyAnalysis | null> => {
  try {
    const companyAnalysis = await companyAnalysisModel.findOne({ companyAnalysisID }, { _id: 0 }).lean();

    if (!companyAnalysis) {
      return null;
    }

    const analysisAnswers = await answerModel.find({ companyAnalysisID }, { _id: 0 }).lean();
    const questionAnswerPairs = [];

    for (const answer of analysisAnswers) {
      const questionOption = await questionOptionModel.findOne({
        questionOptionID: answer.selectedOption,
      }, { _id: 0 }).lean();

      if (questionOption) {
        const question = await questionModel.findOne({ questionID: questionOption.questionID }, { _id: 0 }).lean();

        if (question) {
          const questionSet = await questionSetModel.findOne({
            questionSetID: question.questionSetID,
          }, { _id: 0 }).lean();

          if (questionSet) {
            questionAnswerPairs.push({
              question: {
                setTitle: questionSet.title,
                title: question.title,
                description: question.description,
              },
              answer: questionOption.value,
            });
          }
        }
      }
    }

    return { ...companyAnalysis, answers: questionAnswerPairs };
  } catch (error) {
    console.error('Something went wrong getting a company analysis:', error);
    throw error;
  }
};

/**
 * Creates a new company analysis along with associated answers.
 *
 * @param {CompanyAnalysis} companyAnalysisData - The data for the new company analysis.
 * @return {Promise<CompanyAnalysis | null>}
 * A promise that resolves to the created CompanyAnalysis object or null if an error occurs.
 */
const createCompanyAnalysis = async (companyAnalysisData: CompanyAnalysis): Promise<CompanyAnalysis | null> => {
  try {
    companyAnalysisData.companyAnalysisID = uuidv4();
    const newCompanyAnalysis = new companyAnalysisModel(companyAnalysisData);
    const companyAnalysis = await newCompanyAnalysis.save();

    for (const answer of companyAnalysisData.answers as Answer[]) {
      const newAnswer = new answerModel({
        answerID: uuidv4(),
        companyAnalysisID: companyAnalysisData.companyAnalysisID,
        selectedOption: answer.selectedOption,
        linkedQuestionID: answer.linkedQuestionID,
      });
      await newAnswer.save();
    }

    return removeIdField(companyAnalysis);
  } catch (error) {
    throw error;
  }
};

const companyAnalysisController = {
  getCompanyAnalyses,
  getCompanyAnalysis,
  createCompanyAnalysis,
};

export default companyAnalysisController;
