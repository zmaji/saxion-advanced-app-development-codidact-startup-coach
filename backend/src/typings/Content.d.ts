import type { Label } from './Label';
import type { SimpleUser } from './User';

export interface Content {
    contentID: string;
    user: string | SimpleUser;
    title: string;
    description: string;
    category: string;
    labels?: Label[];
    accessLevel: string;
    attachment: string;
    createdAt: string;
    editedAt?: string | null;
}
