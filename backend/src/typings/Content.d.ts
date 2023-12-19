import type { Label } from './Label';
import type { ContentUser, SimpleUser } from './User';

export interface Content {
    contentID: string;
    user: string | SimpleUser;
    title: string;
    description: string;
    category: string;
    labels?: Label[];
    contentUsers?: ContentUser[] | null;
    feedback?: ContentFeedback[] | null;
    accessLevel: string;
    attachment: string;
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
