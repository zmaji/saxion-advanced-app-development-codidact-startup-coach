import { StepStatuses } from '../enums/StepStatuses';

export interface Step {
  stepID: string,
  moduleID: string,
  name: string,
  description: string,
  status: StepStatuses,
  linkedContentID?: string,
  isDefault: boolean
}
