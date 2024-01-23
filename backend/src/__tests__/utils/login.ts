import request from 'supertest';
import { Express } from 'express';

export function loginAsUser(
    app: Express, 
    userName: string, 
    password: string
): Promise<string> {
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
