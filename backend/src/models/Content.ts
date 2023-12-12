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
    unique: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  accessLevel: {
    type: String,
    required: true,
  },
  attachment: {
    type: String,
    required: false,
  },
  createdAt: {
    type: String,
    required: true,
  },
  editedAt: {
    type: String,
    required: false,
  },

}, {
  collection: 'content',
  versionKey: false,
});

const ContentModel = mongoose.model<Content>('Content', contentSchema);

export default ContentModel;
