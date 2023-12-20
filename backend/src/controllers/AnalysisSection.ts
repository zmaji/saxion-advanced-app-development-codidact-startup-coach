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

const getAnalysisSection = async (analysisSectionID: string): Promise<AnalysisSection | null> => {
  try {
    const analysisSection = await analysisSectionModel.findOne({ analysisSectionID }, { _id: 0 });

    if (!analysisSection) {
      return null;
    }

    const questionSets = await questionSetsModel.find({ analysisSectionID }, { _id: 0 });

    if (!questionSets || questionSets.length === 0) {
      return analysisSection.toObject();
    }

    const questionSetsWithQuestions = await Promise.all(
      questionSets.map(async (questionSet) => {
        const questions = await questionModel.find({ questionSetID: questionSet.questionSetID }, { _id: 0 });

        if (!questions || questions.length === 0) {
          return questionSet.toObject();
        }

        const questionsWithOptions = await Promise.all(
          questions.map(async (question) => {
            const questionOptions = await questionOptionModel.find({ questionID: question.questionID }, { _id: 0 });
            return { ...question.toObject(), questionOptions };
          })
        );

        return { ...questionSet.toObject(), questions: questionsWithOptions };
      })
    );

    return { ...analysisSection.toObject(), questionSets: questionSetsWithQuestions };
  } catch (error) {
    console.error('Something went wrong getting an analysis section:', error);
    throw error;
  }
};

const analysisSectionController = {
  getAnalysisSections,
  getAnalysisSection
};

export default analysisSectionController;
