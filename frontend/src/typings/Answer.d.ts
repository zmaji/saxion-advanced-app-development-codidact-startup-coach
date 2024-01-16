export interface Answer {
  answerID: string;
  companyAnalysisID: string;
  selectedOption: string;
  answer?: string;
  question?: {
    description: string,
    setTitle: string,
    title: string
  };
  linkedQuestionID: string;
}
