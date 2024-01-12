import type { AnalysisSection } from '../typings/AnalysisSection';

import analysisSectionModel from '../models/AnalysisSection';
import questionSetsModel from '../models/QuestionSet';
import questionModel from '../models/Question';
import questionOptionModel from '../models/QuestionOption';

const getAnalysisSections = async (): Promise<AnalysisSection[]> => {
  try {
    return await analysisSectionModel.find({}, { _id: 0 });
  } catch (error) {
    console.error('Something went wrong getting analysis sections:', error);
    throw error;
  }
};

/**
 * Retrieves a specific analysis section by its ID, including associated question sets, questions, and options.
 *
 * @param {string} analysisSectionID - The ID of the analysis section to retrieve.
 * @returns {Promise<AnalysisSection | null>} A promise that resolves to an AnalysisSection object or null if not found.
 */
const getAnalysisSection = async (analysisSectionID: string): Promise<AnalysisSection | null> => {
  try {
    const analysisSection: AnalysisSection | null = await analysisSectionModel.findOne(
        { analysisSectionID },
        { _id: 0 },
    ).lean();

    if (!analysisSection) {
      return null;
    }

    const questionSets = await questionSetsModel.find({ analysisSectionID }, { _id: 0 }).lean();

    if (!questionSets || questionSets.length === 0) {
      return analysisSection;
    }

    const questionSetsWithQuestions = await Promise.all(
        questionSets.map(async (questionSet) => {
          const questions = await questionModel.find({ questionSetID: questionSet.questionSetID }, { _id: 0 }).lean();

          if (!questions || questions.length === 0) {
            return { ...questionSet, questions: [] };
          }

          const questionsWithOptions = await Promise.all(
              questions.map(async (question) => {
                const questionOptions = await questionOptionModel.find(
                    { questionID: question.questionID },
                    { _id: 0 },
                ).lean();

                return { ...question, questionOptions };
              }),
          );

          return { ...questionSet, questions: questionsWithOptions };
        }),
    );

    return { ...analysisSection, questionSets: questionSetsWithQuestions };
  } catch (error) {
    console.error('Something went wrong getting an analysis section:', error);
    throw error;
  }
};

const analysisSectionController = {
  getAnalysisSections,
  getAnalysisSection,
};

export default analysisSectionController;
