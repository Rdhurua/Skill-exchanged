const mongoose=require("mongoose");
const validator =require('validator');

const userSchema=mongoose.Schema({
    name: {
        type: String,
        required:[true, 'Username is required'],
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
      role: {
        type: String,
        enum: ['provider', 'learner'],
        default: 'learner'
      },
      profilePicture: {
        data: Buffer,
        contentType: String,
      },
});

module.exports=mongoose.model("user",userSchema);