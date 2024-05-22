const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on("connected", () => {
  console.log(`Connected MongoDB ${db.name} à ${db.host}:${db.port}`);
});

db.on("error", (err) => {
  console.error(`Error in MongoDb connection: ${err}`);
  process.exit();
});