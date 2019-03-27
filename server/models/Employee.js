const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


//define collection & schema for employee
let Employee = new Schema({
    name : {
        type: String
    },
    department : { type: ObjectId, ref: 'Department'},
    age : Number,
    gender: String
},{
    collection: 'employee'
});

module.exports = mongoose.model('Employee', Employee);
