const express = require("express")
const router = express.Router()

const userController = require('../controllers/users.controller');


/**
 * CRUD User
 */
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post("/register", userController.createUser)
router.put("/update/:id", userController.updateUser)
router.delete("/delete/:id", userController.deleteUser)


/**
 * User LOGIN
 */
router.post("/login", userController.login)



module.exports = router;