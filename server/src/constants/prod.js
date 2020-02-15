import dotenv from 'dotenv';

dotenv.config();
export default {
  IS_PRODUCTION: process.env.PRODUCTION || false,
};
