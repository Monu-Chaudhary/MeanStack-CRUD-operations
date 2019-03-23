const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define collection & schema for User

let User = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
},{
    collection: 'user'
});

User.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', User);
