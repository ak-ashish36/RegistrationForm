const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: [true,"Enter the title"],
        minLength: [2, "Title lenght must be greater than 2"]
    },
    description:{
        type: String, 
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
  module.exports = mongoose.model('user_data', NotesSchema);