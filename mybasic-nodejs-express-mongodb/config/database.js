const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/MyBasicApi");
    console.log(
      `Connected MongoDB database ${mongoose.connection.name} at ${mongoose.connection.host}:${mongoose.connection.port}`
    );
  } catch (err) {
    console.error(`Error in MongoDb connection: ${err}`);
    process.exit(1);
  }
};

module.exports = connectDB;
