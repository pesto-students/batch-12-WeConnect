import express from 'express';
import routes from '../constants/routes';
import userController from '../controllers/users';
import auth from '../middleware/auth';

const router = express.Router();

// register user
router.post(routes.REGISTER, userController.register);

// login user
router.post(routes.LOGIN, userController.login);

// update user
router.post(routes.UPDATE, auth, userController.update);

// get user profile
router.get(routes.PROFILE, auth, userController.profile);

// logout user
router.post(routes.LOGOUT, auth, userController.logout);

export default router;
