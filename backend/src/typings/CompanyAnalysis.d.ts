import type { Answer } from './Answer';

export interface CompanyAnalysis {
  companyAnalysisID: string
  phase: string
  answers?: Answer[] | object[]
}
