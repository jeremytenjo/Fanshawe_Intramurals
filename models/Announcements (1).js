var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var announcementsSchema = new Schema({
    title: String,
    message: String,
    date: Date,
    dateName: String,
    seen: Boolean,
    sport: [{ type: Schema.Types.ObjectId, ref: 'tournaments' }]
});

module.exports = mongoose.model('announcements', announcementsSchema);
