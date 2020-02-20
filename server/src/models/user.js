import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import constants from '../constants/token';

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: 'Invalid Email address' });
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  role: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

const User = mongoose.model('User', userSchema);

userSchema.pre('save', async (next) => {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async () => {
  // Generate an auth token for the user
  const user = this;
  // eslint-disable-next-line
  const token = jwt.sign({ _id: user._id }, constants.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error({ error: 'Invalid login credentials' });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: 'Invalid login credentials' });
  }
  return user;
};

module.exports = User;
