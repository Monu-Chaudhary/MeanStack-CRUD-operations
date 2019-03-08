const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define collection & schema for employee

let Employee = new Schema({
    name : {
        type: String
    },
    address : String,
    phone : Number
},{
    collection: 'employee'
});

module.exports = mongoose.model('Employee', Employee);
