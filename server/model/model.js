const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    description : {
        type: String,
        required: true,
    },
    date : {
        type: Date
    }
})

const Bookdb = mongoose.model('bookdb', schema);

module.exports = Bookdb;