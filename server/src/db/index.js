import mongoose from 'mongoose';
import debugLib from 'debug';
import dotenv from 'dotenv';
import constants from '../constants/db';

dotenv.config();

const debug = debugLib('we-connect:server');

const dbConnect = () =>
  new Promise((resolve, reject) => {
    mongoose.connect(constants.MONGODB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on('connected', () => {
      debug('Connected');
      resolve('connected');
    });

    mongoose.connection.on('error', (err) => {
      debug(`Mongoose default connection error: ${err}`);
      reject(new Error(`Error in connection ${err}`));
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', () => {
      debug('Mongoose default connection disconnected');
    });
  });

const dbDisconnect = () => mongoose.connection.close();

export default { dbConnect, dbDisconnect };
