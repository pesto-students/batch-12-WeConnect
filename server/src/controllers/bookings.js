/* eslint-disable no-underscore-dangle */
import Booking from '../models/booking';

exports.create = async (req, res) => {
  // Create new booking
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.cancel = async (req, res) => {
  // Cancel a booking
  try {
    const { id } = req.body;
    const cancelledBooking = await Booking.cancelBooking(id);
    if (cancelledBooking.n !== 0) {
      res.status(200).send(cancelledBooking);
    } else {
      res.status(400).send('No such booking id exist!');
    }
  } catch (error) {
    res.status(400).send('Not a valid booking Id!');
  }
};

exports.myBookings = async (req, res) => {
  // Fetch all bookings
  try {
    if (req.user.role === 1) {
      const bookings = await Booking.find({ userId: req.user.id });
      res.status(200).send(bookings);
    } else {
      const bookings = await Booking.find({ owner: req.user.id });
      res.status(200).send(bookings);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.bookedSlots = async (req, res) => {
  // Get booked Slots for a particular date and workspace
  try {
    const { locationId, workspaceId, date } = req.body;
    if (!locationId || !workspaceId || !date) {
      throw new Error('Missing parameters!');
    } else {
      const bookedSlots = await Booking.getBookedSlots(
        locationId,
        workspaceId,
        date,
      );
      res.status(200).send(bookedSlots);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
