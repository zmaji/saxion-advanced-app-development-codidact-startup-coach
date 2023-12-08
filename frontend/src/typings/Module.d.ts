import type { Step } from './Step';

export interface Module {
  moduleID: string,
  roadmapID: string,
  steps?: Step[],
  name: string,
  description: string
}
