const express = require('express');
const userRouter = require('./routes/user.routes.js');
const cors = require("cors");

const app = express();

// This line benefits from "Cors" to all the requests of our server
app.use(cors());

// Database connection
/* require("./config/database.js"); */


// Database connection
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/MyBasicApi');

const db = mongoose.connection;

db.on("connected", () => {
  console.log(`Connected MongoDB database ${db.name} à ${db.host}:${db.port}`);
});

db.on("error", (err) => {
  console.error(`Error in MongoDb connection: ${err}`);
  process.exit();
}); 


// Middleware pour parser les requêtes JSON
app.use(express.json());

// Utiliser le routeur utilisateur
app.use(userRouter);

// Démarrer le serveur
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
