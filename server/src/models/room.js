import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  amenities: {
    type: Array,
  },
  images: {
    type: Array,
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: 'No Description.',
  },
  capacity: {
    type: Number,
    required: true,
  },
});

export default roomSchema;
