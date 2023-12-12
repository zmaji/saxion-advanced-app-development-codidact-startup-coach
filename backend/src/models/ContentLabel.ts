import type { ContentLabel } from '../typings/Label';

import mongoose, { Schema } from 'mongoose';

const contentLabelSchema: Schema<ContentLabel> = new Schema({
  labelID: {
    type: String,
    immutable: true,
  },
  contentID: {
    type: String,
  },
}, {
  collection: 'contentLabels',
  versionKey: false,
});

const contentLabelModel = mongoose.model<ContentLabel>('ContentLabel', contentLabelSchema);

export default contentLabelModel;
