const express = require("express")
const port = process.env.PORT || 5000
const app = express();
const router = require('./routes/routes')
const cors = require("cors");

// "Cors" (Cross-Origin Resource Sharing) est un mécanisme qui permet à un serveur de spécifier quels domaines peuvent accéder aux ressources qu'il détient.
// Ca permettra à mon front d'accéder au back même si ils sont sur le même domaine (localhost...)
app.use(cors());

// Middleware pour le parsing du corps de la requête au format JSON
app.use(express.json());

// Middleware pour le parsing du corps de la requête au format URL-encoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Bienvenue dans mon API NodeJS / Express / MySQL"
    })

})


router.router(app);

// La fonction listen() permet d'écouter le port choisi et de déclancher une callback (message de démarrage, gestion d'erreur de connexion ...)
app.listen(port, ()=>{
    console.log("Serveur démarré !");
})