import request from 'supertest';
import { Express } from 'express';

/**
 * Log the user in and return a token to use within the test
 * @param {Express} app - The current instance of the app within the test
 * @param {string} userName - The username of the user which needs to log in
 * @param {string} password - The password of the user to login
 * @return {Promise<string>} token - The response of the login of the user, in this case the token
 */
export function loginAsUser(
    app: Express,
    userName: string,
    password: string,
): Promise<string> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<string>(async (resolve, reject) => {
    try {
      const response = await request(app)
          .post('/credentials')
          .send({
            userName: userName,
            password: password,
          });

      resolve(response.body.token);
    } catch (error) {
      reject(error);
    }
  });
}
