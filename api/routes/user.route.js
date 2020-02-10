const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user.controller');
const checkAuth = require('../middleware/check_auth');

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.delete("/:userId", checkAuth, UserController.user_delete);

router.get("/getall", checkAuth, UserController.users_getall);

router.get("/:userId", checkAuth, UserController.user_getone);

module.exports = router;