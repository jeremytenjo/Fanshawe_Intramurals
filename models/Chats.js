var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatsSchema = new Schema({
    status: Boolean,
    message: String,
    user: [{ type: Schema.ObjectId, ref: 'User' }],
    date: Date,
    team: Schema.ObjectId,
});

module.exports = mongoose.model('Chats', chatsSchema);
