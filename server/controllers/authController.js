import mongoose from 'mongoose'
import userModel from "../model/user-model.js";
import bcrypt from "bcryptjs";
 import {generateToken} from "../utils/token.js";
 import cloudinary from "../utils/cloudinary.js";
import adminModel from "../model/admin-model.js";

export const registeredUser=async function(req,res){
      try{
         let{name,email,password,role}=req.body;
         let user=await userModel.findOne({email:email});
         if(user){
             res.status(401).json({message:"you have already an account"});
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
         res.status(404).json({message:err.message});
      }
}

export const loginUser = async function (req, res) {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "Invalid username or password",
      });
    }

    // Compare the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        error: "Invalid username or password",
      });
    }

    // Generate a token
    const token = await generateToken(user);
console.log(token);

    // Set cookie with the token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    });

    // Respond with user details
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profilePicture:user.profilePicture.data,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Internal server error." });
  }
};



export const logoutUser=async function (req,res) {
   res.cookie("token"," ");
   res.status(200).json("successfull logout");
   
}

export const userProfile=async function(req,res){
   try {
      const user = await userModel.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ user});
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
}

export const uploadPicture = async function (req, res) {
    const { image, userId } = req.body;

    try {
        if (!image || !userId) {
            return res.status(400).json({ message: "Image and userId are required" });
        }

        const result = await cloudinary.uploader.upload(image, {
            folder: "userPic",
        });

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.profilePicture = { data: result.secure_url }; // Ensure schema matches
        await user.save();

        res.status(200).json({
            message: "Profile picture uploaded successfully",
            profilePicUrl: user.profilePicture.data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const getInfo=async (req, res) => {
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

export const updateDetails=async(req,res)=>{
  let userId=req.params.userId;
  let updates=req.body;

  try{
    if (!Object.keys(updates).length) {
      return res.status(400).json({ message: 'No updates provided' });
    }
    const user = await userModel.findByIdAndUpdate(userId, updates, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validations are applied
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user,
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error updating user',
      error: error.message,
    });
  }
}



export const skillMatch = async (req, res) => {
  try {
    const { Skills, userId } = req.body; 
    const skillArray = Array.isArray(Skills) ? Skills : [];
    const users = await userModel.find(
      skillArray.length > 0
        ? { Skills: { $in: skillArray }, _id: { $ne: userId } } 
        : { _id: { $ne: userId } } 
    );

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};











//admin part

export const registeredAdmin=async function(req,res) {

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
export const loginAdmin=async function(req,res){
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

