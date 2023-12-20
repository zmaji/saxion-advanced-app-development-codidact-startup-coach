import ModuleModel from '../models/Module';
import RoadmapModel from '../models/Roadmap';
import StepModel from '../models/Step';
import { Roadmap } from '../typings/Roadmap';

const getAllRoadmaps = async (): Promise<Roadmap[] | null> => {
  try {
    return await RoadmapModel.find({ }, { _id: 0 });
  } catch (error) {
    console.error('Something went wrong getting all Roadmaps:', error);
    throw error;
  }
};

const getRoadmap = async (roadmapID: string): Promise<Roadmap | null> => {
  const roadmap: Roadmap | null = await RoadmapModel.findOne(
      { roadmapID },
      { _id: 0 },
  ).lean();

  if (!roadmap) {
    return null;
  }

  const modules = await ModuleModel.find({ roadmapID }, { _id: 0 }).lean();

  if (!modules || modules.length === 0) {
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
