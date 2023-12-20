type formFieldTypes = 'text' | 'large-text' | 'select';

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
  type?: formFieldTypes;
}