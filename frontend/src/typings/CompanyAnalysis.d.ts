export interface companyAnalysis {
  companyAnalysisID: string,
  industry: string,
  serviceInformation?: string,
  nrOfEmployees: number,
  stage: string,
  businessGoals?: string[],
  painPoints?: string[],
  competitors?: string[],
  targetAudience?: string,
  budget?: number,
  [key: string]: string | string[] | number | undefined;
}
