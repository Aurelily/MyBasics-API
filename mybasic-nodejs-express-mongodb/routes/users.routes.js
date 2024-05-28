const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller.js");

// READ :  Route pour récupérer tous les users
// -------------------------------------------------
router.get("/", userController.getUsers);

// READ : Route pour récupérer un user par ID
// -------------------------------------------------
router.get("/:id", userController.getUserById);

// CREATE : Route pour ajouter un utilisateur
// -------------------------------------------------
router.post("/register", userController.createUser);

// DELETE : Route pour supprimer un utilisateur par ID
// -------------------------------------------------
router.delete("/delete/:id", userController.deleteUserById);

// UPDATE : Route pour mettre à jour un utilisateur par ID
// -------------------------------------------------
router.put("/update/:id", userController.updateUserById);

// LOGIN : Route pour Loguer un utilisateur
// -------------------------------------------------
router.post("/login", userController.loginUser);

module.exports = router;
