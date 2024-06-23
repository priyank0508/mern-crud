const mongoose = require('mongoose');
const options = require('../helper/option');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      default: '',
      required: true,
    },
    lastName: {
      type: String,
      default: '',
      required: true,
    },
    email: {
      type: String,
      trim: true,
      default: null,
      required: true,
      index: true,
    },
    userType: {
      type: String,
      enum: ['Admin', 'User'],
      default: 'User',
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    profileImage: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      trim: true,
      enum: ['Active', 'Deactive'],
      default: 'Active',
    },
  },
  options
);
const User = new mongoose.model('User', UserSchema);
module.exports = User;
