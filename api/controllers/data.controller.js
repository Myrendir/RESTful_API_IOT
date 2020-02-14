const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const data_model = require('../models/data.model.js');
const pos = require('../services/position.data');

exports.data = (req, res, next) => {

    // console.log(req.body);
    // console.log(req.body[i]['x']);
    // const Data = new data_model();
    // for (let i = 0; i < 10; i++) {
    // console.log(req.body[i]['x']);
    // console.log(Number(req.body[i]['x']));
    let result = [];
    // let Data = new data_model();
    let i = 0;
    while (i < 9) {
        let Data = new data_model({
            _id: new mongoose.Types.ObjectId(),
            x: Number(req.body[i]['x']),
            y: Number(req.body[i]['y']),
            z: Number(req.body[i]['z']),
            accX: Number(req.body[i]['accX']),
            accY: Number(req.body[i]['accY']),
            accZ: Number(req.body[i]['accZ']),
            positionX: 1.00,
            positionY: 1.00,
            positionZ: 1.00,
            created_at: new Date()
        });

        i++;

        Data
            .save()
            .then(
                result => {
                    console.log(result);
                    res.status(201).json({
                        message: "Data added."
                    })

                }).catch(err => {
            res.status(500).json({
                error: next(err)
            })
        })
        // console.log(i);
        // console.log(Data);
    }

    // console.log(result);
    // //
    // Data
    //     .save()
    //     .then(result => {
    //         console.log(result);
    //         res.status(201).json({
    //             message: "Data added."
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json({
    //             error: err
    //         })
    //
    //     })

};
