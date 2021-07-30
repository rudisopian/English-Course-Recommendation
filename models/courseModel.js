const mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    listeningId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcriteria"
    },
    readingId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcriteria"
    },
    spokenInteractionId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcriteria"
    },
    spokenProductionId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcriteria"
    },
    writingId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcriteria"
    },
},{
    timestamps: true,
    versionKey: false
})

const Course = mongoose.model('course', courseSchema);

module.exports = Course;