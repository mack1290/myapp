const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    index: true
  },
  firstname: {
    type: String,
    required: true,
    index: true
  },
  lastname: {
    type: String,
    required: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  dob: {
    type: Date
  },
  country: {
    type: String
  },
  skills: {
    type: [String]
  },
  deletedAt: {
    type: Date
}
}, {
  timestamps: true
});

module.exports = User = mongoose.model("users", UserSchema);
