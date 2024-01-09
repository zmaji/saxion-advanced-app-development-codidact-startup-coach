import type { QuestionOption } from './QuestionOption';

export interface Question {
  questionID: string;
  questionSetID?: string;
  inputType: string;
  title: string;
  description: string;
  requiredPhase: string[];
  questionOptions: QuestionOption[];
}
