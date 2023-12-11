import type { ContentLabel } from './label'

export interface Content {
    contentID: string
    user: string
    title: string
    description: string
    category: string
    labels: ContentLabel[]
    accessLevel: string
    attachment: string
    createdAt: DateTime
    editedAt: DateTime
}