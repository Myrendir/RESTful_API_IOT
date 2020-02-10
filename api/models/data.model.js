const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const dataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    positionX: Float64Array,
    positionY: Float64Array,
    positionZ: Float64Array,
    alpha: Float64Array,
    beta: Float64Array,
    gamma: Float64Array,
    created_at: Date
});

const Data = module.exports = mongoose.model('Data', dataSchema);