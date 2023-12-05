export interface companyAnalysis {
  companyAnalysisID: string,
  industry: string,
  nrOfEmployees: string,
  stage: string,
  businessGoals?: string,
  paintPoints?: string[],
  competitors?: string[],
  targetAudience?: string,
  serviceInformation?: string,
  budget?: number
}
