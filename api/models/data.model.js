const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const dataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    x: Float64Array,
    y: Float64Array,
    z: Float64Array,
    positionX: Float64Array,
    positionY: Float64Array,
    positionZ: Float64Array,
    accX: Float64Array,
    accY: Float64Array,
    accZ: Float64Array,
    created_at: Date
});

const Data = module.exports = mongoose.model('Data', dataSchema);
