import type { User } from '../typings/User';

import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema: Schema<User> = new Schema({
  userID: {
    type: String,
    unique: true,
    immutable: true
  },
  company: {
    type: String,
    required: true,
    immutable: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    unique: true,
    required: true
  },
  fullName: {
    type: String,
    required: true
  }
}, {
  collection: 'steps',
  versionKey: false,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
});

const UserModel = mongoose.model<User>('Module', userSchema);

export default UserModel;