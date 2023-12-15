import type { Company } from './Module';

export interface User {
  userID: string,
  company?: Company | string,
  userName: string,
  password: string,
  secret: string,
  emailAddress: string,
  fullName: string,
  roles: string[]
}

export interface SimpleUSer {
  userID: string,
  fullName: string,
}
