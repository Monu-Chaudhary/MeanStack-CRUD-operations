const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

let Attendance = new Schema({
    id: { type: ObjectId, ref: 'Employee' },
    date: { type: Date },
    deleted: { type: Date, default: null }
}, {
        collection: 'attendance'
    });

module.exports = mongoose.model('Attendance', Attendance);