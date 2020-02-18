import mongoose from 'mongoose';
import Room from './room';

const floorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  rooms: {
    type: [Room],
    required: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

export default floorSchema;
