import type { Content } from '../typings/Content';

import mongoose, { Schema } from 'mongoose';

const contentSchema: Schema<Content> = new Schema({
  contentID: {
    type: String,
    unique: true,
    immutable: true,
  },
  user: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
    immutable: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  labels: {
    type: [String],
    required: true,
  },
  accessLevel: {
    type: String,
    required: true,
  },
  attachment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  editedAt: {
    type: String,
    required: true,
  },

}, {
  collection: 'content',
  versionKey: false,
});

const ContentModel = mongoose.model<Content>('Content', contentSchema);

export default ContentModel;
