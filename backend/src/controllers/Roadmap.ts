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
import moduleCriteriaModel from '../models/ModuleCriteria';

const getAllRoadmaps = async (): Promise<Roadmap[] | null> => {
  try {
    return await roadmapModel.find({ }, { _id: 0 });
  } catch (error) {
    console.error('Something went wrong getting all Roadmaps:', error);
    throw error;
  }
};

/**
 * Retrieves the roadmap for the user's company based on the provided token.
 * if the roadmap does not exist, a new one will be generated and returnd
 * @param {string} headers - The headers containing the user token.
 * @return {Promise<Roadmap|null>} A Promise that resolves to the retrieved roadmap or null if not found.
 */
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
      // eslint-disable-next-line max-len
      description: `De weg naar succes voor ${company.name}, binnen deze roadmap zijn modules toegevoegd op basis van de resultaten van de behoefte analyse`,
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

/**
 * Assigns related steps to the provided modules and returns modules with the steps.
 * @param {Module[]} modules - The modules to retrieve steps for.
 * @return {Promise<Module[]>} A Promise that resolves to an array of modules with their associated steps.
 */
const getModulesWithSteps = async (modules: Module[]): Promise<Module[]> => {
  const modulesWithSteps: Module[] = [];

  for (const module of modules) {
    const moduleSteps = await stepModel.find({ moduleID: module.moduleID }, { _id: 0 }).lean();
    modulesWithSteps.push({ ...module, steps: moduleSteps });
  }

  return modulesWithSteps;
};

/**
 * Assigns a copy of modules to a roadmap based on company analysis and creates associated steps.
 * @param {string} companyAnalysisID - The ID of the company analysis.
 * @param {string} roadmapID - The ID of the roadmap to which modules are assigned.
 * @return {Promise<Module[]>} A Promise that resolves to an array of assigned modules.
 */
const assignModules = async (companyAnalysisID: string, roadmapID: string): Promise<Module[]> => {
  const companyAnalysis = await companyAnalysisModel.findOne({ companyAnalysisID }, { _id: 0 });

  if (companyAnalysis) {
    const roadmapModules: Module[] = [];
    const phaseModules: Module[] = await moduleModel.find({
      isDefault: true,
      phase: { $in: companyAnalysis.phase.toLowerCase() },
    }, { _id: 0 }).lean();
    const steps: Step[] = await stepModel.find({ isDefault: true }, { _id: 0 }).lean();
    const moduleCriteria = await moduleCriteriaModel.find().lean();
    for (const module of phaseModules) {
      const expectedAnswers = moduleCriteria.filter((criteria) => criteria.moduleID === module.moduleID);

      if (await isConformToCriteria(companyAnalysisID, { ...module, expectedAnswers: expectedAnswers })) {
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
            isDefault: false,
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

/**
 * Checks if a module conforms to specified criteria based on company analysis answers.
 * If a modules conforms to criteria it will be added to the roadmap by returning true
 * @param {string} companyAnalysisID - The ID of the company analysis.
 * @param {Module} module - The module to check for conformity.
 * @return {Promise<boolean>} A Promise that resolves to true if the module conforms, otherwise false.
 */
const isConformToCriteria = async (companyAnalysisID: string, module: Module): Promise<boolean> => {
  const analysisAnswers: Answer[] = await answerModel.find({ companyAnalysisID }).lean();
  const questions = await questionModel.find();

  for (const answer of analysisAnswers) {
    const question = questions.find((question) => question.questionID === answer.linkedQuestionID);

    if (question) {
      for (const expectedAnswer of module.expectedAnswers!) {
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
