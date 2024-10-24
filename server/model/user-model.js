const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      role: {
        type: String,
        enum: ['provider', 'learner'],
        default: 'learner'
      }
});

module.exports=mongoose.model("user",userSchema);