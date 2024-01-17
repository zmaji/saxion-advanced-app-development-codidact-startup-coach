type StepStatuses = 'toStart' | 'inProgress' | 'inReview' | 'finished';

export interface Step {
  stepID: string,
  moduleID: string,
  name: string,
  description: string,
  status: string,
  linkedContentID?: StepStatuses,
  isDefault: boolean
}
