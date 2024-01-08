import type { QuestionOption } from './QuestionOption';

export interface FormStep {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  completed: boolean;
}

export interface FormData {
  label: string;
  step: FormStep;
  value: string | number;
  isValid: boolean;
  errorMessage: string;
  inputType: string;
  options: QuestionOption[];
}