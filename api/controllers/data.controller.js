const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const data_model = require('../models/data.model.js');
const pos = require('../services/position.data');

exports.data = (req, res, next) => {
    const Data = new data_model({
        _id: new mongoose.Types.ObjectId(),
        x: req.body.x,
        y: req.body.y,
        z: req.body.z,
        accX: req.body.accX,
        accY: req.body.accY,
        accZ: req.body.accZ,
        positionX: pos(accX),
        positionY: pos(accY),
        positionZ: pos(accZ),

        created_at: new Date()
    });
    Data
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Data added."
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};
