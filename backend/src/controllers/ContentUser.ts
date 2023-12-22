import type { ContentUser, SimpleUser } from '../typings/User';
import type { Content } from '../typings/Content';

import contentModel from '../models/Content';
import contentUserModel from '../models/ContentUser';

const addContentUsers = async (contentID: string, users: SimpleUser[]): Promise<ContentUser[]> => {
  try {
    const content: Content | null = await contentModel.findOne({ contentID });

    if (content) {
      const contentUsers: ContentUser[] = await contentUserModel.find({ contentID: contentID }, { _id: 0 }).lean();
      const newContentUsers: ContentUser[] = [];

      for (const user of users) {
        if (!contentUsers.find((contentUser) => contentUser.userID === user.userID)) {
          const contentUser: ContentUser = {
            userID: user.userID,
            contentID: contentID,
            accessLevel: 'review',
          };

          const newContentUser = await contentUserModel.create(contentUser);
          await newContentUser.save();

          newContentUsers.push({
            ...contentUser,
            fullName: user.fullName,
          });
        } else {
          throw new Error(`User with ID ${user.userID} is already a reviewer for this content.`);
        }
      }

      return newContentUsers;
    }

    return [];
  } catch (error) {
    console.error('Something went wrong adding new content users:', error);
    throw error;
  }
};

const contentUserController = {
  addContentUsers,
};

export default contentUserController;
