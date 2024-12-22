const mongoose=require("mongoose");
const dbgr=require("debug")("development:mongoose");
const config=require("config");
const dotenv=require("dotenv");
  dotenv.config();
mongoose
.connect(`${config.get(process.env.MONGODB_URL2 || process.env.MONGODB_URL)}/skill-exchanged`,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(function(){
    dbgr("connected to database");
})
.catch(function(err){
     dbgr(err);
})

module.exports=mongoose.connection