import type { Module } from '../typings/Module';

import moduleModel from '../models/Module';
import stepModel from '../models/Step';
import { Step } from '../typings/Step';

const getModule = async (moduleID: string): Promise<Module | null> => {
  try {
    const result: Module | null = await moduleModel.findOne({ moduleID }, { _id: 0 }).lean();

    if (result) {
      const steps: Step[] = await stepModel.find({ moduleID: moduleID }, { _id: 0 }).lean();

      return { ...result, steps: steps };
    }

    return result;
  } catch (error) {
    console.error('Something went wrong getting content:', error);
    throw error;
  }
};

const moduleController = {
  getModule,
};

export default moduleController;
