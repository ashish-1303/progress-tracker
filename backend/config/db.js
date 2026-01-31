const mongoose = require('mongoose');

const connectDB = async () => 
{
  try
  {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected With MongoDB!");
  }
  catch(error)
  {
    console.error("Error Connecting With DB : ",error); 
    process.exit(1);
  }  
};

module.exports = connectDB;