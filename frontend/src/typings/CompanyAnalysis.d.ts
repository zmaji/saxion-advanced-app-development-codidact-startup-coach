import type { Answer } from './Answer';
import type { AnswerPair } from './AnswerPair';

export interface CompanyAnalysis {
  companyAnalysisID: string
  phase: string
  answers: Answer[]
}
