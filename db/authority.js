let mongoose = require('.');

let Schema = mongoose.Schema;

let authoritySchema = Schema({
    auth_id: String,
    name: String,
    url: String,
    actions: Array,
    created: String
});
let Auth = mongoose.model('manager_authority', authoritySchema);

module.exports = Auth;