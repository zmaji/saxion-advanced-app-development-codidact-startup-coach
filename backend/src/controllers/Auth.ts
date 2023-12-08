import type { User } from '../typings/User';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User';

export const authenticateUser = async (userName: string, password: string): Promise<string | null> => {
  try {
    if (userName && password) {
      const user: User | null = await UserModel.findOne({ userName: userName });

      if (user) {
        const result = bcrypt.compareSync(password, user.password);

        if (result) {
          return jwt.sign({
            userID: user.userID,
            email: user.emailAddress,
            roles: user.roles,
          }, user.secret);
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error('Something went wrong authenticating a user:', error);
    throw error;
  }
};

const Auth = {
  authenticateUser,
};

export default Auth;
