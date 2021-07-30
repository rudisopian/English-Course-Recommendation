const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : String,
    weight : Number,
    criteriaId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "criteria"
    }
}, {
    timestamps: true,
    versionKey: false
})

const Subcriteria = mongoose.model('subcriteria', schema);

module.exports = Subcriteria;