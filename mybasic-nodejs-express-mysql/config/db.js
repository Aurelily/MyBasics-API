const mysql = require("mysql");
const dotenv = require("dotenv");

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // Si je suis en local sur mon linux, je dois ajouter à cette info le socket local où se trouve mon serveur Apache (MAMP...Etc.)
  //socketPath: "/var/run/mysqld/mysqld.sock"
};

// On va créer une connexion à la bdd avec la methode createConnexion()
const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion : " + err.stack);
    return;
  } else {
    console.log("Connexion à la BDD reussie sur le port " + process.env.PORT);
  }
});

module.exports = db;
