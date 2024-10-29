const jwt=require("jsonwebtoken");
 const generateToken=async function (user) {
    return jwt.sign({email:user.email,id:user._id},process.env.JWT_SALT_KEY);
 }

 module.exports.generateToken=generateToken;