export interface Step {
  stepID: string,
  moduleID: string,
  name: string,
  description: string,
  status: string,
  linkedContentID?: string,
  isDefault: boolean
}
