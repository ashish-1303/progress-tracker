const mongoose = require('mongoose');
const marksSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    unique: true,
  },
  totalMarks: {
    type: Number,
    required: true,
    min: 1 
  },
  obtainedMarks: {
    type: Number,
    required: true,
    min: 0,
  },
  percentage: {
    type: Number,
  },
  cgpa:{
    type: Number,
   },  
 },
 {
   timestamps: true, 
 }
);
module.exports = mongoose.model("Marks", marksSchema);

