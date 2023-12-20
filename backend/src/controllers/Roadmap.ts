import RoadmapModel from '../models/Roadmap';
import { Roadmap } from '../typings/Roadmap';

const getAllRoadmaps = async (): Promise<Roadmap[] | null> => {
  try {
    return await RoadmapModel.find({ }, { _id: 0 });
  } catch (error) {
    console.error('Something went wrong getting all Roadmaps:', error);
    throw error;
  }
};

const roadmapController = {
  getAllRoadmaps,
};

export default roadmapController;
