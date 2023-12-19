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
