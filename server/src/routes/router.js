import express from 'express';
import index from './index';
import users from './users';
import workspace from './workspace';
import routes from '../constants/routes';

const router = express.Router();

router.use(routes.INDEX, index);
router.use(routes.USER, users);
router.use(routes.WORKSPACE, workspace);

export default router;
