import jwt from "jsonwebtoken";
export const generateToken=async function (user) {
    return  jwt.sign({email:user.email,id:user._id.toString()},process.env.JWT_SALT_KEY,{ expiresIn: '1h' });
 }

