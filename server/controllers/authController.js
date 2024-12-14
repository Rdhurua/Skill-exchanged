const userModel=require("../model/user-model");
 const adminModel=require("../model/admin-model");
const bcrypt=require("bcrypt");
 const {generateToken}=require("../utils/token");
 const cloudinary=require("../utils/cloudinary.js");

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
                     res.status(404).json(err.message);
                }
                else{
                     let user=await userModel.create({
                         name,email,role,password:hash,
                     });
                     let token=generateToken(user);
                     res.cookie("token",token,{
                        httpOnly: true,  
                        secure: process.env.NODE_ENV === 'production', 
                        maxAge: 3600000, 
                        sameSite: 'Strict'
                    });
                     res.status(200).json({message:"successfully registered",user});
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
      res.status(404).json({ message: "Invalid email address. Please verify your email and try again" });

    }
    else{
       bcrypt.compare(password,user.password,async function(err,result){
          if(result){
             let token= await generateToken(user);
            res.cookie('token', token, {
               httpOnly: true,  
               secure: process.env.NODE_ENV === 'production', 
               maxAge: 3600000, 
               sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax', 
               path: '/', 
           });

           res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });
          }
          else{
            res.status(404).json({message:"you have entered wrong password or email"});
          }
       })
    }
}

module.exports.logoutUser=async function (req,res) {
   res.cookie("token"," ");
   res.status(200).json("successfull logout");
   
}

module.exports.userProfile=async function(req,res){
   try {
      const user = await userModel.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
}

//admin part

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
                      let token= await generateToken(Admin);
                      res.cookie("token",token,{
                        httpOnly: true,  
                        secure: process.env.NODE_ENV === 'production', 
                        maxAge: 3600000, 
                        sameSite: 'Strict'
                    });
                      res.status(200).json({
                        message:"admin successfully registered once",
                        Admin});
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
                res.cookie("token",token,{
                  httpOnly: true,  
                  secure: process.env.NODE_ENV === 'production', 
                  maxAge: 3600000, 
                  sameSite: 'Strict'
              });
                res.status(200).json({message:"admin logged in successfull",admin});
              }
              else{
                res.status(404).json({message:"you have entered wrong password"});
              }
          })
        }
    } catch(err){
       res.status(404).json(err.message);
    }
     
}

module.exports.uploadPicture=async function(req,res){

    const{image,userId}=req.body;

  try {
      const result=await cloudinary.uploader.upload(image,{
         folder:"userPic",
      });

     // Get user ID from request body
    const user = await userModel.findById(userId); // Find user in the database

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user's profile picture URL
    user.profilePicture.data = result.secure_url; // Cloudinary provides the file URL in `req.file.path`
    await user.save();

    res.status(200).json({ 
      message: "Profile picture uploaded successfully", 
      profilePicUrl: user.profilePicture.data 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading profile picture" });
  }
}

module.exports.getInfo=async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile fetched successfully",
      user: {
        name: user.name,
        email: user.email,
        profilePic: user.profilePicture.data, // Include profile picture
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user profile" });
  }
}