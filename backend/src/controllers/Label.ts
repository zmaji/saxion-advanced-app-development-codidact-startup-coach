import { Label } from '../typings/Label';
import labelModel from '../models/Label';

const getAllLabels = async (): Promise<Label[]> => {
  try {
    return await labelModel.find({}, { _id: 0 });
  } catch (error) {
    console.error('Something went wrong getting all labels:', error);
    throw error;
  }
};

const labelController = {
  getAllLabels,
};

export default labelController;
