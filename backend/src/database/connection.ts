/* eslint-disable require-jsdoc */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
// const DB_USER = process.env.DB_USER;
// const DB_PASSWORD = process.env.DB_NAME;

class Database {
  constructor() {
    this.connect();
  }

  private connect() {
    const mongoURI =
      // `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/?authMechanism=SCRAM-SHA-256&authSource=admin`;
      `mongodb://root:admin@api-mongo:27017/?authMechanism=SCRAM-SHA-256&authSource=admin`;
    console.log('setting up database connection');

    mongoose.connect(mongoURI, {})
        .then(() => {
          console.log('Database connection successful to ' + DB_HOST + ':' + DB_PORT);
        })
        .catch((err) => {
          console.log('Database connection error:', err);
        });
  }
}

export default new Database();
