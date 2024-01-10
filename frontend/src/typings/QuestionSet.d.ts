import type { Questions } from './Question';

export interface QuestionSet {
  questionSetID: string;
  analysisSectionID?: string;
  inputType: string;
  questions: Questions[];
  title: string;
  description: string;
  requiredPhase: string;
  displayNumber?: number;
}
