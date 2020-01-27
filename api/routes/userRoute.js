const express = require("express");
const router = express.Router();

const UserController = require('../controllers/userController');
const checkAuth = require('../middleware/checkAuth');

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.delete("/:userId", checkAuth, UserController.user_delete);

router.get("/", UserController.users_getall);

router.get("/:userId", UserController.user_getone);

module.exports = router;
