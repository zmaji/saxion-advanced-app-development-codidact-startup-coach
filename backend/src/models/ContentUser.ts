import type { ContentUser } from '../typings/User';

import mongoose, { Schema } from 'mongoose';

const contentUserSchema: Schema<ContentUser> = new Schema({
  userID: {
    type: String,
  },
  contentID: {
    type: String,
  },
  accessLevel: {
    type: String,
  },
}, {
  collection: 'contentUsers',
  versionKey: false,
});

const contentUserModel = mongoose.model<ContentUser>('ContentUser', contentUserSchema);

export default contentUserModel;
