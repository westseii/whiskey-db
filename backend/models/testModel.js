const mongoose = require("mongoose");

const testSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId, // owner
    //   required: true,
    //   ref: "User",
    // },
    text: {
      type: String,
      required: [true, "Add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Test", testSchema);
