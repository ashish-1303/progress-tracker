const mongoose = require('mongoose');
const workSchema = mongoose.Schema({
   title:{
     type: String,
     required: true,
     trim: true,
   },
   subject:{
     type: String,
     required: true,
     trim: true,
   },
   type:{
     type: String,
     enum: ['assignment', 'project'],
     required: true,
   },
   status:{
     type: String,
     enum: ['pending', 'completed'],
     default: "pending",
     required: true,
   },
   student:{
     type: mongoose.Schema.Types.ObjectId,
     ref: "User",
     required: true,
   }, 
 },
 {
   timestamps: true, 
 }
);

module.exports = mongoose.model("Work", workSchema);