import type { companyAnalysis } from './CompanyAnalysis';
import type { Roadmap } from './Roadmap';

export interface Company {
  companyID: string,
  companyAnalysis?: companyAnalysis | string,
  roadmap?: Roadmap | string,
  name: string,
  location: string
}
