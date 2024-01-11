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
        seletedOptionID: string
      }
    ]
  }
  steps?: Step[],
  name: string,
  description: string
}
