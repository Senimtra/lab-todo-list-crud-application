// ### Require mongoose ###
const mongoose = require('mongoose');

// ### Create new schema ###
const taskSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
         minlength: 3,
         maxlength: 120
      }
   },
   {
      timestamps: true
   }
);

// ### Create model using task schema ###
const Task = mongoose.model('Task', taskSchema);

// ### Export model ###
module.exports = Task;
