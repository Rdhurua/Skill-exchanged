const jwt=require("jsonwebtoken");
 const generateToken=async function (user) {
   // console.log("Generating token for user:", { email: user.email, id: user._id.toString() });
    return  jwt.sign({email:user.email,id:user._id.toString()},process.env.JWT_SALT_KEY,{ expiresIn: '1h' });
 }

 module.exports.generateToken=generateToken;