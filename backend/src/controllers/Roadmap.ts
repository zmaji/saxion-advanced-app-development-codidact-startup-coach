import type { Roadmap } from '../typings/Roadmap';

import jwt from 'jsonwebtoken';
import { Company } from '../typings/Company';
import { User } from '../typings/User';
import { Module } from '../typings/Module';
import moduleModel from '../models/Module';
import roadmapModel from '../models/Roadmap';
import stepModel from '../models/Step';
import companyModel from '../models/Company';
import companyAnalysisModel from '../models/CompanyAnalysis';
import answerModel from '../models/Answer';
import questionModel from '../models/Question';

const getAllRoadmaps = async (): Promise<Roadmap[] | null> => {
  try {
    return await roadmapModel.find({ }, { _id: 0 });
  } catch (error) {
    console.error('Something went wrong getting all Roadmaps:', error);
    throw error;
  }
};

const getRoadmap = async (headers: string): Promise<Roadmap | null> => {
  const userToken: string = headers.split(' ')[1];
  const user = jwt.decode(userToken) as User | null;

  const company: Company | null = await companyModel.findOne(
      { companyID: user!.company },
      { _id: 0 },
  );

  if (!company) {
    return null;
  }

  const roadmap: Roadmap | null = await roadmapModel.findOne(
      { roadmapID: company!.roadmap },
      { _id: 0 },
  ).lean();

  if (!roadmap) {
    return null;
  }
  assignModules('2165e04d-e505-4a43-8551-579aa182f9bc');
  const modules = await moduleModel.find({ roadmapID: company!.roadmap }, { _id: 0 }).lean();

  if (!modules || modules.length === 0) {
    roadmap.modules = [];

    return roadmap;
  }

  const modulesWithSteps = await Promise.all(
      modules.map(async (module) => {
        const moduleSteps = await stepModel.find({ moduleID: module.moduleID }, { _id: 0 }).lean();

        if (!moduleSteps || moduleSteps.length === 0) {
          return { ...module, steps: [] };
        }

        return { ...module, steps: moduleSteps };
      }),
  );

  return { ...roadmap, modules: modulesWithSteps };
};

const assignModules = async (companyAnalysisID: string): Promise<Module[] | null> => {
  const modules: Module[] = [];

  const companyAnalysis = await companyAnalysisModel.findOne({ companyAnalysisID }, { _id: 0 }).lean();

  if (!companyAnalysis) {
    return null;
  }

  const allModules: Module[] = await moduleModel.find();
  // const phaseModule: Module[] = allModules.filter((module) => {
  //   module.phase.filter((phase) => phase === companyAnalysis.phase.toLowerCase());
  // });

  const analysisAnswers = await answerModel.find({ companyAnalysisID }, { _id: 0 }).lean();
  analysisAnswers.forEach(async (answer) => {
    const question = await questionModel.findOne({
      questionID: answer.linkedQuestionID,
    });
    // console.log(question);

    if (question) {
      allModules.forEach((module) => {
        console.log(module.criteria);
        // if (question.questionSetID === module.criteria.questionSetID) {
        //   console.log('gelijk');
        // }
      });
    }
  });

  // console.log(analysisAnswers);

  // modules.forEach((module) => {
  //   console.log(module.name);
  // });

  return modules;
};

const roadmapController = {
  getAllRoadmaps,
  getRoadmap,
};

export default roadmapController;
