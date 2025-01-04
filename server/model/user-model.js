import  mongoose from "mongoose";
import validator from 'validator';

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
        data: {
          type: String,
          default: "https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-avatar-image-for-profile-png-image_9197911.png",
        },
        contentType: {
          type: String,
          default: "image/png",
        },
      },
      about:{
           type:String,
           default:"",
      },
      Skills:{
         type:Array,
         default:[],
      },
      Course:{
        type:Array,
        default:[],
      },
      Learnt:{
         type:Array,
         default:[],
      },
      // createdAt: { type: Date, default: Date.now },
      // isActive: { type: Boolean, default: false },
      lastLogin:{type:Date,default:null},
      isLoggedIn: { type: Boolean, default: false }
},{ timestamps: true });
const user=mongoose.model("user",userSchema);

export default user;