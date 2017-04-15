var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var announcementsSchema = new Schema({
    title: String,
    message: String,
    date: Date
});

module.exports = mongoose.model('announcements', announcementsSchema);
