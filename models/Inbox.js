var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inboxSchema = new Schema({
    from:  [{ type: Schema.ObjectId, ref: 'User' }],
    to:  [{ type: Schema.ObjectId, ref: 'User' }],
    subject: String,
    message: String,
    date: Date,
    dateName: String,
    notify: Boolean
}, {
    collection: 'inbox'
});

module.exports = mongoose.model('Inbox', inboxSchema);
