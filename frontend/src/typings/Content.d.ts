import type { Label } from '@/typings/Label';
import type { SimpleUser } from '@/typings/User';

export interface Content {
  contentID: string;
  user: string | SimpleUser;
  title: string;
  description: string;
  category: string;
  labels: Label[];
  accessLevel: string;
  attachment?: string;
  createdAt: string;
  editedAt?: string | null;
}