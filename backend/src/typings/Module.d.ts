import type { Step } from './Step';

export interface Module {
  moduleID: string;
  roadmapID: string;
  phase: string[];
  questionSetID: string;
  expectedAnswers?: ModuleCriteria[];
  isDefault: boolean;
  steps?: Step[];
  name: string;
  description: string;
}

export interface ModuleCriteria {
  moduleID: string
  questionID: string;
  selectedOptionID: string;
}
