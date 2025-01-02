import mongoose  from "mongoose";

const connectTodb=async()=>{
  try{

    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to database");

  }
  catch(error){
     console.log("error during connecting to database:",error.message);
  }
}

  export default connectTodb;
