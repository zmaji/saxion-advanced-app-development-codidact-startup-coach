import type { Roadmap } from '../typings/Roadmap';

import jwt from 'jsonwebtoken';
import { Company } from '../typings/Company';
import { User } from '../typings/User';
import { Module } from '../typings/Module';
import { Answer } from '../typings/Answer';
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

  const allModules: Module[] = await moduleModel.find().lean();
  // const phaseModule: Module[] = allModules.filter((module) => {
  //   module.phase.filter((phase) => phase === companyAnalysis.phase.toLowerCase());
  // });

  // const analysisAnswers: Answer[] = await answerModel.find({ companyAnalysisID }, { _id: 0 }).lean();
  // await Promise.all(analysisAnswers.map(async (answer) => {
  //   const question = await questionModel.findOne({ questionID: answer.linkedQuestionID }).lean();

  //   if (question) {
  //     allModules.forEach((module: Module) => {
  //       if (question.questionSetID === module.criteria.questionSetID) {
  //         module.criteria.expectedAnswers.forEach((pair) => {
  //           if (pair.questionID === question.questionID &&
  //             pair.seletedOptionID === answer.selectedOption) {
  //             if (!modules.includes(module)) {
  //               modules.push(module);
  //             }
  //           }
  //         });
  //       }
  //     });
  //   }
  // }));

  for (const module of allModules) {
    if (await isConformToCriteria(companyAnalysisID, module)) {
      modules.push(module);
    }
  }
  for (const module of modules) {
    console.log(module);
  }

  return modules;
};

const isConformToCriteria = async (companyAnalysisID: string, module: Module): Promise<boolean> => {
  const analysisAnswers: Answer[] = await answerModel.find({ companyAnalysisID }, { _id: 0 }).lean();

  for (const answer of analysisAnswers) {
    const question = await questionModel.findOne({ questionID: answer.linkedQuestionID }).lean();

    if (question) {
      for (const pair of module.criteria.expectedAnswers) {
        if (!pair.questionID || pair.questionID === '') {
          return false;
        } else if (pair.questionID === question.questionID) {
          if (pair.selectedOptionID !== answer.selectedOption) {
            return false;
          }
        }
      }
    }
  }

  return true;
};

const roadmapController = {
  getAllRoadmaps,
  getRoadmap,
};

export default roadmapController;
