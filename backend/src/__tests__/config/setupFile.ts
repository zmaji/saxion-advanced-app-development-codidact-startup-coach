import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import createServer from '../../utils/createServer';
import { Express } from 'express';

let mongoServer: MongoMemoryServer;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export let app: Express;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  app = createServer();

  // add mock data in the memory database using the mongoose models
}, 60000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
}, 60000);
