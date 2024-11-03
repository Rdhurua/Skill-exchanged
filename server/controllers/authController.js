const userModel=require("../model/user-model");
 const adminModel=require("../model/admin-model");
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

module.exports.loginUser=async function (req,res) {
    let {email,password}=req.body;
    let user=await userModel.findOne({email:email});
    if(!user){
       res.send("incorrect email or password");
    }
    else{
       bcrypt.compare(password,user.password,function(err,result){
          if(result){
             let token=generateToken(user);
             res.cookie("token",token);
              res.send(user);
          }
          else{
            res.send("you have entered wrong password or email");
          }
       })
    }
}

module.exports.logoutUser=async function (req,res) {
   res.cookie("token"," ");
   res.status(200).json("successfull logout");
   
}




module.exports.registeredAdmin=async function(req,res) {

      const admin= await adminModel.findOne({});
      if(admin){
         return res.status(400).json({ message: "Admin already exists, only one admin allowed" });
      }
      
    let {username,email,phoneNumber,password}=req.body;
     bcrypt.genSalt(10, async function(err,salt){
            bcrypt.hash(password,salt,async function(err,hash){
                   if(err){
                      res.send(err.message);
                   }
                   else{
                      let Admin=await adminModel.create({
                        username,email,phoneNumber,password:hash,
                      });
                      let token=generateToken(Admin);
                      res.cookie("token",token);
                      res.send(Admin);
                   }
            })
     })
    
}
module.exports.loginAdmin=async function(req,res){
    let {email,password}=req.body;

    try{

       let admin=await adminModel.findOne({email:email});
       if(!admin){
          res.status(401).send("Access Denied");
       }
   
        else{
          bcrypt.compare(password,admin.password,async function(err,result){
              if(result){
                let token=generateToken(admin);
                res.cookie("token",token);
                res.send(admin);
              }
              else{
                res.status(404).send("you have entered wrong password");
              }
          })
        }
    } catch(err){
       res.send(err.message);
    }
     
}