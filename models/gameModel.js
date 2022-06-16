const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let gameSchema = Schema({
    title: {type: String, required: true, min: 1}, 
    tone: {type: String},
    type: {type: String},
    subject: {type: String}
});

// TODO: complete the scheme for students using the tutorial specification
module.exports = mongoose.model('Game', gameSchema);