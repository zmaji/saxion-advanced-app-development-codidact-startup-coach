import type { Roadmap } from '../typings/Roadmap';

import { Company } from '../typings/Company';
import jwt from 'jsonwebtoken';
import { User } from '../typings/User';
import ModuleModel from '../models/Module';
import RoadmapModel from '../models/Roadmap';
import StepModel from '../models/Step';
import CompanyModel from '../models/Company';

const getAllRoadmaps = async (): Promise<Roadmap[] | null> => {
  try {
    return await RoadmapModel.find({ }, { _id: 0 });
  } catch (error) {
    console.error('Something went wrong getting all Roadmaps:', error);
    throw error;
  }
};

const getRoadmap = async (headers: string): Promise<Roadmap | null> => {
  const userToken: string = headers.split(' ')[1];
  const user = jwt.decode(userToken) as User | null;

  const company: Company | null = await CompanyModel.findOne(
      { companyID: user!.company },
      { _id: 0 },
  );

  if (!company) {
    return null;
  }

  const roadmap: Roadmap | null = await RoadmapModel.findOne(
      { roadmapID: company!.roadmap },
      { _id: 0 },
  ).lean();

  if (!roadmap) {
    return null;
  }

  const modules = await ModuleModel.find({ roadmapID: company!.roadmap }, { _id: 0 }).lean();

  if (!modules || modules.length === 0) {
    roadmap.modules = [];

    return roadmap;
  }

  const modulesWithSteps = await Promise.all(
      modules.map(async (module) => {
        const moduleSteps = await StepModel.find({ moduleID: module.moduleID }, { _id: 0 }).lean();

        if (!moduleSteps || moduleSteps.length === 0) {
          return { ...module, steps: [] };
        }

        return { ...module, steps: moduleSteps };
      }),
  );

  return { ...roadmap, modules: modulesWithSteps };
};

const roadmapController = {
  getAllRoadmaps,
  getRoadmap,
};

export default roadmapController;
