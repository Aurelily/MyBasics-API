const express = require("express");
const router = require("./routes/routes");
const cors = require("cors");
const connectDB = require("./config/database");

const app = express();

// This line benefits from "Cors" to all the requests of our server
app.use(cors());

// Database connection
connectDB();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Utiliser le routeur utilisateur
app.use(router);

// Démarrer le serveur
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
