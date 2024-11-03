const mongoose = require('mongoose');
const validator =require('validator');


const adminSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, 'Username is required'],
      minlength: [3, 'Username must be at least 3 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
      validate: {
        validator: function (value) {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(value);
        },
        message: 'Password must include uppercase, lowercase, number, and special character',
      },
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      validate: {
        validator: function (value) {
          return /^\d{10}$/.test(value); // Ensures 10-digit phone number
        },
        message: 'Please enter a valid 10-digit phone number',
      },
    },
  });
  
  module.exports = mongoose.model('admin', adminSchema);
  