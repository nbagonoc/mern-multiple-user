const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create Schema
const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "subscriber"
    // roles available to this proj: admin, moderator, subscriber
  },
  password: {
    type: String
  }
});

// module.exports = User = mongoose.model("users", UserSchema);
mongoose.model("users", userSchema);
