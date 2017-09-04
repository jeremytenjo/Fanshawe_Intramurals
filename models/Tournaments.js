var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var torunamentsSchema = new Schema({
    sport: String,
    capacity: Number,
    startDate: Date,
    endDate: Date,
    amount: Number,
    banner: String,
    rules: String,
    promoBanner: String,
    promoBannerColor: String,
    genderIcon: String,
    startDateName: String,
    endDateName: String,
    genderIcon: String,
    icon: String,
    teams: [{ type: Schema.Types.ObjectId, ref: 'Teams' }],
    type: String
});

module.exports = mongoose.model('tournaments', torunamentsSchema);
