const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : String,
    weight : Number
}, {
    timestamps: true,
    versionKey: false
})

const Criteria = mongoose.model('criteria', schema);

module.exports = Criteria;