const jwt=require("jsonwebtoken");
const userModel=require("../model/user-model");
// const adminModel=require("../model/admin-model");

module.exports=async function(req,res,next){
    if(!req.cookies.token){
         res.status(205).json({message:"sorry😒,you have to login first"});
    }
    try{
         let decode= jwt.verify(req.cookies.token,process.env.JWT_SALT_KEY);
         let user=await userModel.findOne({email:decode.email})
                                  .select("-password");
                                  req.user=user;
                                  next();
    }catch(err){
           res.send(err.message);
    }
}