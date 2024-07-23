Ne pas oublier de lancer le serveur MongoDB local pour le test:
-------------------------------------------------------------------
$ sudo systemctl start mongod

Installer ExpressJS
-------------------------------------------------------------------
$ npm install express --save

Puis installer la librairie Mongoose
-------------------------------------------------------------------
$ npm install mongoose --save

Si besoin installer bcrypt pour crypter les passwords des users
-------------------------------------------------------------------
$ npm i bcrypt

Si besoin installer validator pour valider les formats d'email des users
-------------------------------------------------------------------
$ npm i validator

Installer le middleware Cors pour gérer les problèmes de requetes vers l'exterieur
-------------------------------------------------------------------
$ npm i cors

Installer les librairies suivantes pour plus de confort :
-------------------------------------------------------------------
    - Nodemon : pour relancer le serveur automatiquement
        $ npm install -g nodemon 
    - Morgan : pour tracer les requetes http (en version tiny ça suffit)
        $ npm i Morgan
        Pour utiliser Morgan in tiny version : app.use(morgan("tiny"));
    - dotenv : pour pouvoir créer un fichier .env et gérer les variables d'environnement