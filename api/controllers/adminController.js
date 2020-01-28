const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/adminModel");

exports.signup = (req, res, next) => {
    Admin.find({email: req.body.email})
        .exec()
        .then(admin => {
            if (admin.length > 1) {
                return res.status(409).json({
                    message: "Mail already exists."
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const admin = new Admin({
                            _id: new mongoose.Types.ObjectId,
                            email: req.body.email,
                            password: hash,
                            createdAt: new Date(),
                            updatedAt: null
                        });
                        admin.save().then(result => {
                            console.log(result);
                            res.status(201).json({
                                message: 'Admin created.'
                            });
                        })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err

                                })
                            })
                    }
                })
            }
        })

};