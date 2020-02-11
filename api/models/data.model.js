const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const dataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    x: Number,
    y: Number,
    z: Number,
    positionX: Number,
    positionY: Number,
    positionZ: Number,
    accX: Number,
    accY: Number,
    accZ: Number,
    created_at: Date
});

const Data = module.exports = mongoose.model('Data', dataSchema);
