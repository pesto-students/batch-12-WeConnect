import mongoose from 'mongoose';

import Address from './address';
import Floor from './floor';

const workspaceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: Address,
    required: true,
  },
  images: {
    type: Array,
  },
  floors: {
    type: [Floor],
    required: false,
  },
  workspaceAmenities: {
    type: Array,
    required: false,
    description: 'These are common amenities of the workspace',
  },
  operationHours: {
    type: Array,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  roomAmenities: {
    type: Array,
    required: false,
    description: 'These are computed Room specific Amenities',
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  maxCapacity: {
    type: Number,
    default: 0,
  },
});

module.exports = workspaceSchema;
