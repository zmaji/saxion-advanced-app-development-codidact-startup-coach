import type { QuestionOption } from './QuestionOption';

export interface QuestionSet {
  questionSetID: string;
  analysisSectionID?: string;
  inputType: string;
  options: QuestionOption[];
  title: string;
  description: string;
  requiredPhase: string;
}
