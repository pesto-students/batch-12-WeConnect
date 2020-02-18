import mongoose from 'mongoose';

const addressSchema = mongoose.Schema({
  fullAddress: {
    type: String,
    required: true,
    trim: true,
  },
  locality: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: String,
    required: true,
    trim: true,
  },
});

export default addressSchema;
