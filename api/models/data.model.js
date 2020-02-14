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

dataSchema.methods.add = function (name, callback) {
    this.name = name;
    return this.save(callback);
};
module.exports = mongoose.model('Data', dataSchema);


