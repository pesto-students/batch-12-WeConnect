import express from 'express';
import index from './index';
import users from './users';
import routes from '../constants/routes';

const router = express.Router();

// GET home page.
router.use(routes.INDEX, index);

router.use(routes.USER, users);

export default router;
