const express = require('express');
const router = express.Router();

const data_controller = require('../controllers/data.controller');

router.post('/data', data_controller.data);

module.exports = router;
