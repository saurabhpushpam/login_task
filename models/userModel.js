const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  dob: {
    type: Date,
    required: true,
  },


  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
  },

  password: {
    type: String,
    required: true
  },

},
  {
    timestamps: true
  });

module.exports = mongoose.model("user", userSchema);