import express from 'express';
import index from './index';
import users from './users';
import workspace from './workspace';
import bookings from './bookings';
import room from './room';
import routes from '../constants/routes';

const router = express.Router();

router.use(routes.INDEX, index);

// Access user api's
router.use(routes.USER, users);
// Access workspace api's
router.use(routes.WORKSPACE, workspace);
// Access booking api's
router.use(routes.BOOKINGS, bookings);

router.use(routes.ROOM, room);

export default router;
