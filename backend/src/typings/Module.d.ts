import type { Step } from './Step';

export interface Module {
  moduleID: string;
  roadmapID: string;
  phase: string[];
  criteria: {
    questionSetID: string;
    expectedAnswers: ExpectedAnswer[];
  };
  isDefault: boolean;
  steps?: Step[];
  name: string;
  description: string;
}

interface ExpectedAnswer {
  questionID: string;
  selectedOptionID: string;
}
