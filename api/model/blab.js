const mongoose = require('mongoose');

const blabSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    postTime: Date,
    author: {
        email: String,
        name: String
    },
    message: {type: String, required : false}
});

module.exports = mongoose.model('Blab', blabSchema);