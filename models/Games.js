var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gamesSchema = new Schema({
    tournament: Schema.ObjectId,
    teamOne: [{
        type: Schema.ObjectId,
        ref: 'teams'
    }],
    teamTwo: [{
        type: Schema.ObjectId,
        ref: 'teams'
    }],
    date: Date,
    location: String,
    user: Schema.ObjectId,
    notes: String,
    stage: String,
    group: Number,
    dateString: String,
    scoreTeamOne: String,
    scoreTeamTwo: String,
    time: String
}, {
    collection: 'games'
});

module.exports = mongoose.model('games', gamesSchema);
