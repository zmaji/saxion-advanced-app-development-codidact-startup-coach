import type { Step } from './Step';

export interface Module {
  moduleID: string,
  roadmapID: string,
  phase: string[],
  criteria: {
    questionSetID: string,
    expectedAnswers: [
      {
        questionID: string,
        selectedOptionID: string
      }
    ]
  }
  steps?: Step[],
  name: string,
  description: string
}
