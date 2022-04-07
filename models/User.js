const mongoose = require('mongoose');
const { Schema } = mongoose;
const validators = require('validator');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name cannot be blank"],
        minLength: [3, "Name Lenght must be greater or equal to 3"]
    },
    phone: {
        type: Number,
        unique: true,
        required: [true, "Enter your Mobile number"],
        validate: {
            validator: function(v) {
              return /^([0-9]){10}$/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
          }, 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validators.isEmail, 'Please Enter a valid email address'],
        validate: {
            validator: function (v) {
                  return validators.isEmail(v);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    password: {
        type: String,
        required: [true, "Password cannot be blank"]
    },
    address: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
});
const User = mongoose.model('user', UserSchema);
module.exports = User;