import type { User } from '../typings/User';

import mongoose, { Schema } from 'mongoose';

const userSchema: Schema<User> = new Schema({
  userID: {
    type: String,
    unique: true,
    immutable: true,
  },
  company: {
    type: String,
    required: true,
    immutable: true,
  },
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  secret: {
    type: String,
    immutable: true,
  },
  emailAddress: {
    type: String,
    unique: true,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
}, {
  collection: 'steps',
  versionKey: false,
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
