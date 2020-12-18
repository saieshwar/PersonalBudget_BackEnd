const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema({
  // firstName: {
  //     type: string,
  //     required:true
  // },
  // lastName: {
  //     type: string,
  //     required: true
  // },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },

  displayName: {
    type: String,
  },
});

module.exports = mongoose.model("user", userDetailsSchema);
