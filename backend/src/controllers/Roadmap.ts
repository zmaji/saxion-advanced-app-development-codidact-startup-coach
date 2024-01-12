import type { Roadmap } from '../typings/Roadmap';
import type { Company } from '../typings/Company';
import type { User } from '../typings/User';
import type { Module } from '../typings/Module';
import type { Answer } from '../typings/Answer';
import type { Step } from '../typings/Step';

import jwt from 'jsonwebtoken';
import moduleModel from '../models/Module';
import roadmapModel from '../models/Roadmap';
import stepModel from '../models/Step';
import companyModel from '../models/Company';
import companyAnalysisModel from '../models/CompanyAnalysis';
import answerModel from '../models/Answer';
import questionModel from '../models/Question';
import { v4 as uuidv4 } from 'uuid';

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
  const user: User | null = jwt.decode(userToken) as User | null;

  let company: Company | null = await companyModel.findOne({ companyID: user!.company }, { _id: 0 }).lean();

  if (!company) {
    return null;
  }

  const roadmap: Roadmap | null = await roadmapModel.findOne(
      { roadmapID: company!.roadmap },
      { _id: 0 },
  ).lean();

  if (!roadmap) {
    const newRoadmap: Roadmap = {
      roadmapID: uuidv4(),
      title: `De roadmap voor ${company.name}`,
      description: `De weg naar succes voor ${company.name},
      binnen deze roadmap zijn modules toegevoegd op basis van de resultaten van de behoefte analyse`,
      modules: [],
    };

    const newMongoRoadmap = new roadmapModel(newRoadmap);
    await newMongoRoadmap.save();

    company = {
      ...company,
      roadmap: newRoadmap.roadmapID,
    };
    await companyModel.findOneAndUpdate({ companyID: company.companyID }, company, { new: true });

    const modules: Module[] = await assignModules(company.companyAnalysis as string, newRoadmap.roadmapID);

    return { ...newRoadmap, modules: await getModulesWithSteps(modules) };
  }

  const modules: Module[] | null = await moduleModel.find({ roadmapID: roadmap.roadmapID }, { _id: 0 }).lean();

  return { ...roadmap, modules: await getModulesWithSteps(modules ? modules : []) };
};

const getModulesWithSteps = async (modules: Module[]): Promise<Module[]> => {
  const modulesWithSteps: Module[] = [];

  for (const module of modules) {
    const moduleSteps = await stepModel.find({ moduleID: module.moduleID }, { _id: 0 }).lean();
    modulesWithSteps.push({ ...module, steps: moduleSteps });
  }

  return modulesWithSteps;
};

const assignModules = async (companyAnalysisID: string, roadmapID: string): Promise<Module[]> => {
  const companyAnalysis = await companyAnalysisModel.findOne({ companyAnalysisID }, { _id: 0 });

  if (companyAnalysis) {
    const roadmapModules: Module[] = [];
    const phaseModules: Module[] = await moduleModel.find({
      isDefault: true,
      phase: { $in: companyAnalysis.phase.toLowerCase() },
    }, { _id: 0 }).lean();
    const steps: Step[] = await stepModel.find({}, { _id: 0 }).lean();

    for (const module of phaseModules) {
      if (await isConformToCriteria(companyAnalysisID, module)) {
        const moduleSteps: Step[] = steps.filter((step) => step.moduleID === module.moduleID);

        module.moduleID = uuidv4();
        module.roadmapID = roadmapID;
        module.isDefault = false;
        const newModule = new moduleModel(module);
        await newModule.save();

        for (let moduleStep of moduleSteps) {
          moduleStep = {
            ...moduleStep,
            stepID: uuidv4(),
            moduleID: module.moduleID,
          };

          const newModuleStep = new stepModel(moduleStep);
          await newModuleStep.save();
        }

        roadmapModules.push(module);
      }
    }

    return roadmapModules;
  }

  return [];
};

const isConformToCriteria = async (companyAnalysisID: string, module: Module): Promise<boolean> => {
  const analysisAnswers: Answer[] = await answerModel.find({ companyAnalysisID });
  const questions = await questionModel.find();

  for (const answer of analysisAnswers) {
    const question = questions.find((question) => question.questionID === answer.linkedQuestionID);

    if (question) {
      for (const expectedAnswer of module.criteria.expectedAnswers) {
        if (
          (expectedAnswer.questionID === question.questionID) &&
          (expectedAnswer.selectedOptionID !== answer.selectedOption)
        ) {
          return false;
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
