const User = require("../models/user.model");
const bcrypt = require("bcrypt");

/**
 * READ : Get a list of all users of database
 * @param {*} req
 * @param {*} res
 */
async function getAllUsers(req, res) {
  try {
    const users = await User.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

/**
 *  READ : Get infos about one user with his Id
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function getUserById(req, res) {
  const userId = req.params.id;

  try {
    const user = await User.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

/**
 * CREATE : Create a user in database
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function createUser(req, res) {
  const { pseudo, email, password, passwordConf } = req.body;

  if (!pseudo || !email || !password || !passwordConf) {
    return res
      .status(400)
      .json({ message: "Vous devez remplir tous les champs" });
  }

  try {
    // Vérification si l'utilisateur existe déjà avec l'email fourni
    const existingUser = await User.getUserByEmail(email);

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Un utilisateur avec cet email existe déjà" });
    }
    if (password === passwordConf) {
      // Création de l'utilisateur
      const newUser = await User.createUser({ pseudo, email, password });
      res
        .status(201)
        .json((newUser.message = "Utilisateur enregistré avec succès !"));
    } else {
      return res
        .status(409)
        .json({ message: "Les deux mots de passe ne correspondent pas" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

/**
 * UPDATE : Update a user infos in database with his Id
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function updateUser(req, res) {
  const userId = req.params.id;
  const { pseudo, email, password, passwordConf } = req.body;

  if (!pseudo || !email || !password || !passwordConf) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    if (password === passwordConf) {
      // Update du profil dans la bdd
      const updatedUser = await User.updateUser(userId, {
        pseudo,
        email,
        password,
      });
      res
        .status(201)
        .json((updatedUser.message = "Profil mis à jour avec succès !"));
    } else {
      return res
        .status(409)
        .json({ message: "Les deux mots de passe ne correspondent pas" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

/**
 * DELETE : Delete a user infos in database with his Id
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function deleteUser(req, res) {
  const userId = req.params.id;

  try {
    const deletedUser = await User.deleteUser(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

/**
 * LOGIN USER
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    // Rechercher l'utilisateur par son e-mail
    const user = await User.getUserByEmail(email);

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
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
};
