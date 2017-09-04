var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamsSchema = new Schema({
    creator: Schema.ObjectId,
    name: String,
    position: Number,
    // sport: Schema.ObjectId,
    sport: [{ type: Schema.Types.ObjectId, ref: 'tournaments' }],
    wins: Number,
    ties: Number,
    loses: Number,
    points: Number,
    file: String,
    group: Number,
    players: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    tournament: [{
        type: Schema.ObjectId,
        ref: 'tournaments'
    }]
}, {
    collection: 'teams'
});

module.exports = mongoose.model('teams', teamsSchema);
