const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Add a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Add an email"],
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, "Add a first name"],
    },
    lastName: {
      type: String,
      required: [true, "Add a last name"],
    },
    password: {
      type: String,
      required: [true, "Add a password"],
    },
    flags: {
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
