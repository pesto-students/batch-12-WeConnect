import express from 'express';
import routes from '../constants/routes';
import bookingController from '../controllers/bookings';
import auth from '../middleware/auth';
import isCustomer from '../middleware/isCustomer';

const router = express.Router();

// register user
router.post(routes.CREATE, [auth, isCustomer], bookingController.create);

router.post(routes.CANCEL, [auth, isCustomer], bookingController.cancel);

router.get(routes.MYBOOKINGS, auth, bookingController.myBookings);

router.post(
  routes.BOOKEDSLOTS,
  [auth, isCustomer],
  bookingController.bookedSlots,
);

export default router;
