const express = require("express");
const router = express.Router();

const adminController = require('../controllers/adminController');
const checkAuth = require('../middleware/checkAuth');

router.post("/signup", adminController.signup);

module.exports = router;