const mongoose=require("mongoose");
const dbgr=require("debug")("development:mongoose");
const config=require("config");
const dotenv=require("dotenv");
  dotenv.config();
mongoose
.connect(`${config.get(`MONGODB_URL2`|| `MONGODB_URL`)}/skill-exchanged`)

.then(function(){
    dbgr("connected");
})
.catch(function(err){
     dbgr(err);
})

module.exports=mongoose.connection