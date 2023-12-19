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

export interface SimpleUser {
  userID: string,
  fullName: string,
}

type AccessLevel = 'view' | 'review' | 'edit';

export interface ContentUser {
  userID: string,
  contentID: string,
  fullName?: string
  accessLevel: AccessLevel,
}
