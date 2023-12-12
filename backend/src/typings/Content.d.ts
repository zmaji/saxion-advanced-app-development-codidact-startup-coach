import type { Label } from './Label';

import { User } from './User';

export interface Content {
    contentID: string;
    user: User;
    title: string;
    description: string;
    category: string;
    labels: Label[];
    accessLevel: string;
    attachment: string;
    createdAt: string;
    editedAt?: string | null;
}
