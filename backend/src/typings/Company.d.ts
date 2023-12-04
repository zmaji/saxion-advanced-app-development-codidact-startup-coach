import type { Roadmap } from './Roadmap';

export interface Company {
  companyID: string,
  roadmap?: Roadmap | string,
  name: string
}
