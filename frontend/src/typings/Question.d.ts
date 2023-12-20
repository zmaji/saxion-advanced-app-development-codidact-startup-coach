export interface Question {
  questionID: string;
  questionSetID?: string;
  inputType: string;
  title: string;
  description: string;
  requiredPhase: string[];
}
