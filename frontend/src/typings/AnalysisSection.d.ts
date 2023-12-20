import type { QuestionSet } from './QuestionSet';

export interface AnalysisSection {
  analysisSectionID: string;
  title: string;
  description: string;
  questionSets: QuestionSet[];
}
