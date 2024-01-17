import type { Content } from './Content';
import type { StepStatuses } from '@/enums/StepStatuses';

export interface Step {
  stepID: string,
  moduleID: string,
  name: string,
  description: string,
  content: string,
  status: StepStatuses,
  linkedContent?: Content[],
  isDefault: boolean
}
