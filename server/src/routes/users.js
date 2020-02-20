import express from 'express';
import routes from '../constants/routes';
import userController from '../controllers/users';
import auth from '../middleware/auth';

const router = express.Router();

// register user
router.post(routes.REGISTER, userController.register);

// login user
router.post(routes.LOGIN, userController.login);

// get user profile
router.get(routes.PROFILE, auth, userController.profile);

// logout user
router.post(routes.LOGOUT, auth, userController.logout);

// logout user from all device
router.post(routes.LOGOUTALL, auth, userController.logoutAll);

export default router;
