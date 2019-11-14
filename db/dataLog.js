let mongoose = require('.');

let Schema = mongoose.Schema;

let logSchema = Schema({
    username: String,
    account: String,
    created: Number,
    title: String,
    url: String,
    action: String
});

let log = mongoose.model('manager_log', logSchema);

module.exports = log;