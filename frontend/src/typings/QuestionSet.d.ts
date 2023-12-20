import type { QuestionOption } from '../../../backend/src/typings/QuestionOption';

export interface QuestionSet {
  questionSetID: string;
  analysisSectionID?: string;
  inputType: string;
  options: QuestionOption[];
  title: string;
  description: string;
  requiredPhase: string;
}
