const userModel=require("../model/user-model");
const bcrypt=require("bcrypt");
 const {generateToken}=require("../utils/token");

module.exports.registeredUser=async function(req,res){
      try{
         let{name,email,password,role}=req.body;
         let user=await userModel.findOne({email:email});
         if(user){
             res.status(401).send("you have already an account");
         }
          bcrypt.genSalt(10,function(err,salt){
             bcrypt.hash(password,salt,async function(err,hash) {
                if(err){
                     res.send(err.message);
                }
                else{
                     let user=await userModel.create({
                         name,email,role,password:hash,
                     });
                     let token=generateToken(user);
                     res.cookie("token",token);
                     res.send(user);
                }
             })
          })
      }
      catch(err){
         res.send(err.message);
      }
}