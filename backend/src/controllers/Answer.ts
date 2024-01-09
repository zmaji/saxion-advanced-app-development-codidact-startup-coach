import type { Answer } from '../typings/Answer';

import AnswerModel from '../models/Answer';

const getAnswers = async (companyAnalysisID: string): Promise<Answer[]> => {
  try {
    return await AnswerModel.find({ companyAnalysisID }, { _id: 0 });
  } catch (error) {
    console.error('Something went wrong getting answers:', error);
    throw error;
  }
};

const AnswerController = {
  getAnswers
};

export default AnswerController;
