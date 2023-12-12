import type { Company } from './Company';

export interface User {
  userID: string,
  company?: Company | string,
  userName: string,
  password: string,
  secret: string,
  emailAddress: string,
  fullName: string
}
