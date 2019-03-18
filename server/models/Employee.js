const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define collection & schema for employee

let Employee = new Schema({
    name : {
        type: String
    },
    department : String,
    age : Number,
    gender: String
},{
    collection: 'employee'
});

module.exports = mongoose.model('Employee', Employee);
