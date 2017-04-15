var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schedulesSchema = new Schema({
    user: Schema.ObjectId,
    times: Array
});

module.exports = mongoose.model('schedules', schedulesSchema);
