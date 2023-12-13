import type { Label } from '../typings/Label';

import { v4 as uuidv4 } from 'uuid';
import labelModel from '../models/Label';

const getAllLabels = async (): Promise<Label[] | null> => {
  try {
    return await labelModel.find({ }, { _id: 0 });
  } catch (error) {
    console.error('Something went wrong getting labels:', error);
    throw error;
  }
};

const getLabel = async (labelID: string): Promise<Label | null> => {
  try {
    return await labelModel.findOne({ labelID }, { _id: 0 });
  } catch (error) {
    console.error('Something went wrong getting labels:', error);
    throw error;
  }
};

const createLabel = async (labelData: Label): Promise<Label> => {
  try {
    labelData.labelID = uuidv4();
    const newLabel = new labelModel(labelData);

    await newLabel.save();

    return newLabel;
  } catch (error) {
    console.error('Something went wrong creating new label:', error);
    throw error;
  }
};

const labelController = {
  getLabel,
  getAllLabels,
  createLabel,
};

export default labelController;
