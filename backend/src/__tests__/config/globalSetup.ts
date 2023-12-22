import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import config from './config';

export = async function globalSetup() {
  if (config.Memory) {
    const instance = await MongoMemoryServer.create({
      binary: {
        version: '6.0.6',
        // @ts-ignore
        skipMD5: true,
      },
    });
    const uri = instance.getUri();

    // eslint-disable-next-line
    (global as any).__MONGOINSTANCE = instance;
    process.env.MONGO_URI = uri;

    await mongoose.connect(uri, { });

    // Ensure the database is clean before tests start
    await mongoose.connection.db.dropDatabase();
  } else {
    process.env.MONGO_URI = `mongodb://${config.IP}:${config.Port}`;
  }
};
