export interface Step {
  stepID: string,
  moduleID: string,
  name: string,
  description: string,
  content: string,
  status: string,
  linkedContentID?: string,
  isDefault: boolean
}
