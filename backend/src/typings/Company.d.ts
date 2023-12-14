import type { CompanyAnalysis } from './CompanyAnalysis';
import type { Roadmap } from './Roadmap';

export interface Company {
  companyID: string,
  companyAnalysis?: CompanyAnalysis | string,
  roadmap?: Roadmap | string,
  name: string,
  location: string
}
