let mongoose = require('.');

let Schema = mongoose.Schema;

let authSchema = Schema({
    auth_id: Number,
    name: String,
    url: String,
    children: Array
});
let Auth = mongoose.model('manager_auth', authSchema);

module.exports = Auth;