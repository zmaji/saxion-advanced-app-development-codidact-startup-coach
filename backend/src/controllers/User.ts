import type { SimpleUser } from '../typings/User';

import userModel from '../models/User';

const getAllUsers = async (): Promise<SimpleUser[]> => {
  try {
    return await userModel.find({}, { userID: 1, fullName: 1, _id: 0 });
  } catch (error) {
    console.error('Something went wrong getting all users:', error);
    throw error;
  }
};

const userController = {
  getAllUsers,
};

export default userController;
