var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var User = new Schema({
    email: String,
    password: String,
    fname: String,
    lname: String,
    number: Number,
    type: String,
    photo: String,
    notification: Boolean,
    gender: String,
    schedule: Array,
    team: [{ type: Schema.ObjectId, ref: 'teams' }],
    // team: Schema.ObjectId,
    tournaments: [{ type: Schema.ObjectId, ref: 'tournaments' }],
    social: Array
}, {
    collection: 'users'
});


module.exports = mongoose.model('User', User);
