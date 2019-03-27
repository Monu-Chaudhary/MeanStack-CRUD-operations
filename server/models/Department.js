const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Department = new Schema({
    name: String,
    // enteredOn: { type: Date, default: Date.now }
},{
    collection: 'department'
});

module.exports = mongoose.model('Department', Department);