export interface Content {
  contentID: string;
  user: string;
  title: string;
  description: string;
  category: string;
  accessLevel: string;
  attachment?: string;
  createdAt: string;
  editedAt?: string | null;
}