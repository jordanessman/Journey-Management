const mongoose = require('mongoose');

const userSchema = new mongoose.schema({
    username: {
        type : String,
        require: true,
    },
    password: {
        type: String,
        required: true,
    }
    })

module.exports = ('User',userSchema);