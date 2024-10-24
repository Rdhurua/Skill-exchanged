const mongoose=require("mongoose");
const dbgr=require("debug")("development:mongoose");
const config=require("config");
const dotenv=require("dotenv");
  dotenv.config();
mongoose
.connect(`${config.get("MONGODB_URL2")}/skill-exchanged`)
// .connect(`mongodb+srv://${process.env.username}:${process.env.password}@cluster0.xidhx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(function(){
    dbgr("connected");
})
.catch(function(err){
     dbgr(err);
})

module.exports=mongoose.connection