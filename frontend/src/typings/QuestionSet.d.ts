import type { Questions } from '../../../backend/src/typings/QuestionOption';

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
