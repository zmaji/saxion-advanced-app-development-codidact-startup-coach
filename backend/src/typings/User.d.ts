import type { Company } from './Module';

export interface User {
  userID: string,
  company?: Company | string,
  username: string,
  password: string,
  emailAddress: string,
  fullName: string
}
