import type { User } from '../typings/User';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userModel from '../models/User';

export const authenticateUser = async (
    userName: string,
    emailAddress: string,
    password: string,
): Promise<string | null> => {
  try {
    if ((userName || emailAddress) && password) {
      const user: User | null = userName ?
      await userModel.findOne({ userName: userName }) :
      await userModel.findOne({ emailAddress: emailAddress });

      if (user) {
        const result = bcrypt.compareSync(password, user.password);

        if (result) {
          return jwt.sign({
            userID: user.userID,
            email: user.emailAddress,
            fullname: user.fullName,
            company: user.company,
            roles: user.roles,
          }, user.secret);
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      console.error('Something went wrong authenticating a user: Missing username or email address');

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
