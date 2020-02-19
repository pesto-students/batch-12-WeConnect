import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  },
  locationName: {
    type: String,
    required: true,
  },
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true,
  },
  workspaceName: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  floorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Floor',
    required: true,
  },
  floorName: {
    type: String,
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  roomName: {
    type: String,
    required: true,
  },
  meetingStartTime: {
    type: Date,
    required: true,
  },
  meetingEndTime: {
    type: Date,
    required: true,
  },
  isCancelled: {
    type: Boolean,
    default: false,
  },
});

bookingSchema.statics.cancelBooking = async (bookingId) => {
  try {
    const booking = await Booking.updateOne(
      { _id: bookingId },
      { isCancelled: true },
    );
    return booking;
  } catch (error) {
    throw new Error(error);
  }
};

bookingSchema.statics.getBookedSlots = async (
  locationId,
  workspaceId,
  date,
) => {
  try {
    const booking = await Booking.find({
      locationId,
      workspaceId,
      meetingStartTime: {
        $gte: new Date(new Date(date).setHours(0, 0, 0)),
        $lt: new Date(new Date(date).setHours(23, 59, 59)),
      },
    });
    return booking;
  } catch (error) {
    throw new Error({ error: 'Error fetching the booking!' });
  }
};

const Booking = mongoose.model('Bookings', bookingSchema);

module.exports = Booking;
