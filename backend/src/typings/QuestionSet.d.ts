import { NumberExpression } from 'mongoose';
import type { Question } from './QuestionOption';

export interface QuestionSet {
  questionSetID: string;
  analysisSectionID?: string;
  inputType: string;
  questions: Question[];
  title: string;
  description: string;
  requiredPhase?: string;
  displayOrder?: number;
}
