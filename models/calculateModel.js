const mongoose = require('mongoose');

var calculateSchema = new mongoose.Schema({
    listeningId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course"
    },
    readingId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course"
    },
    spokenInteractionId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course"
    },
    spokenProductionId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course"
    },
    writingId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course"
    },
},{
    timestamps: true,
    versionKey: false
})

const Course = mongoose.model('calculate', calculateSchema);

module.exports = Calculate;