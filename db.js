const mongoose = require("mongoose");
const myprocess = require("dotenv").config();
const mongodb =myprocess.parsed.MONGO_DB
const connectdb = async ()=>{
  await mongoose.connect(mongodb);
  if(mongoose.connection.readyState === 1)
  {
    console.log("connected to db");
  }
  else
{
  console.log("failed to conncet to DB");
}
}
module.exports={
  mongoose,
  connectdb
}