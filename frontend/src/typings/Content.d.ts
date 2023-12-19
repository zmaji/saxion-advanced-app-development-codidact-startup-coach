import type { Label } from '@/typings/Label';
import type { SimpleUser, ContentUser } from '@/typings/User';

export interface Content {
  contentID: string;
  user: string | SimpleUser;
  title: string;
  description: string;
  category: string;
  labels: Label[];
  contentUsers?: ContentUser[];
  feedback?: ContentFeedback[];
  accessLevel: string;
  attachment?: string;
  createdAt: string;
  editedAt?: string | null;
}

export interface ContentFeedback {
  feedbackID: string,
  contentID: string,
  user: string | SimpleUser;
  feedback: string;
  createdAt: string;
}
