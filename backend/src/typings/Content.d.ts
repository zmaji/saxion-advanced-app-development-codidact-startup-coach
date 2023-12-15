import type { Label } from './Label';

export interface Content {
    contentID: string;
    user: string;
    title: string;
    description: string;
    category: string;
    labels: Label[];
    accessLevel: string;
    attachment: string;
    createdAt: string;
    editedAt?: string | null;
}
