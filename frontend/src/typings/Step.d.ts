import type { Content } from './content';

export interface Step {
  stepID: string,
  moduleID: string,
  name: string,
  description: string,
  content: string,
  status: string,
  linkedContent?: Content[],
  isDefault: boolean
}
