const express = require("express");
const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../models/users.model.js");

// READ :  Récupérer tous les users
// -------------------------------------------------
exports.getUsers = async function (req, res, next) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ : Récupérer un user par ID
// -------------------------------------------------
exports.getUserById = async function (req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE : Ajouter un utilisateur
// -------------------------------------------------
exports.createUser = async function (req, res, next) {
  const { pseudo, email, password } = req.body;

  // Vérifier que tous les champs requis sont présents
  if (!pseudo || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  // Vérifier que le format de l'email est correct
  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ message: "Cet email n'a pas un format valide!" });
  }

  try {
    // Rechercher si un utilisateur avec cet email existe déjà
    const userTest = await User.findOne({ email });
    if (userTest) {
      return res
        .status(409)
        .json({ message: "Ce mail possède déjà un compte!" });
    }

    // Créer une nouvelle instance de l'utilisateur
    const user = new User({ pseudo, email, password });

    // Sauvegarder l'utilisateur dans la base de données
    await user.save();

    // Connexion réussie, renvoyer les informations de l'utilisateur connecté
    return res.status(201).json({
      id: user._id,
      pseudo: user.pseudo,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// DELETE : Supprimer un utilisateur par ID
// -------------------------------------------------
exports.deleteUserById = async function (req, res, next) {
  try {
    const user = await User.findById(req.params.id);

    if (user == null) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await User.deleteOne({ _id: req.params.id });
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE : Mettre à jour un utilisateur par ID
// -------------------------------------------------
exports.updateUserById = async function (req, res, next) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // new: true renvoie le document mis à jour, runValidators: true exécute les validateurs du schéma
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// LOGIN : Fonction pour se logguer en tant qu'utilisateur
// -------------------------------------------------
exports.loginUser = async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    // Rechercher l'utilisateur par son e-mail
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Connexion réussie, renvoyer les informations de l'utilisateur connecté
    return res.json({
      id: user.id,
      pseudo: user.pseudo,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
