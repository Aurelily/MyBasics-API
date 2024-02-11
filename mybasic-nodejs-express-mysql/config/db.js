const mysql = require("mysql")

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "MyBasicAPI",
    // Si je suis en local, je dois ajouter à cette info le socket local où se trouve mon serveur Apache (MAMP...Etc.)
    socketPath: "/var/run/mysqld/mysqld.sock"
  };

// On va créer une connexion à la bdd avec la methode createConnexion()
const db = mysql.createConnection(dbConfig);

db.connect((err)=>{
    if(err){
        console.error("Erreur de connexion : " + err.stack)
        return;
    }else{
        console.log("Connexion à la BDD reussie !");
    }
    
})

module.exports = db;