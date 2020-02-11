const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user.controller');
const checkAuth = require('../middleware/check_auth');
const authorize = require('../middleware/authorize');
const role = require('../middleware/role');

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.delete("/:userId", checkAuth, authorize(role.admin), UserController.user_delete);

router.get("/getall", checkAuth, authorize(role.admin), UserController.users_getall);

router.get("/:userId", checkAuth, authorize(role.admin), UserController.user_getone);

router.patch("/:userId", checkAuth, authorize(role.admin), UserController.user_update);

router.post("/add_admin", checkAuth, authorize(role.admin), UserController.admin_add);

module.exports = router;
