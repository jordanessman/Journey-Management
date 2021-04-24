const mongoose = require ('mongoose');

const journeySchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    employeeNum: {
        type: String,
        required: true
    },
    phoneNum: {
        type: String,
        required: true
    },
    points: {
        type: Number,
    },
    truckNum: {
        type: String,
        required: true
    },
    trailerNum: {
        type: String,
        required: true
    },
    mileage: {
        type: String,
        required: true
    },
    journeyStart: {
        type: String,
        required: true
    },
    driveTime: {
        type: String,
        required: true
    },
    expectedArival: {
        type: String,
        required: true
    },
    submissionDate: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    completionTime: {
        type: String,
    },
    completionSubTime: {
        type: String,
    }
})


const Journey = mongoose.model('Journey', journeySchema);

module.exports = Journey;