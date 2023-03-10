const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const mongooseConnection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${mongooseConnection.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectToDB;
