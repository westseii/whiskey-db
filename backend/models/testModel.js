const mongoose = require("mongoose");

const testSchema = mongoose.Schema(
  {
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
