import { StepStatuses } from '../enums/StepStatuses';

export interface Step {
  stepID: string,
  moduleID: string,
  name: string,
  description: string,
  status: string,
  linkedContentID?: StepStatuses,
  isDefault: boolean
}
