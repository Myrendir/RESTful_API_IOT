const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const data_model = require('../models/data.model');

exports.data = (req, res, next) => {
    const Data = new data_model({
        _id: new mongoose.Types.ObjectId(),
        positionX: Float64Array,
        positionY: Float64Array,
        positionZ: Float64Array,
        alpha: Float64Array,
        beta: Float64Array,
        gamma: Float64Array,
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