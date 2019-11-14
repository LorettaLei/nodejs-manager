let mongoose = require('.');

let Schema = mongoose.Schema;

let userSchema = Schema({
    account: {
        type: String,
        required: true
    },
    passwd: {
        type: String,
        required: true
    },
    username: { 
        type: String,
        required: true
    },
    department: String,
    active: Boolean,
    created: Number,
    updated: Number,
    lastLogin: Number,
    auth_list: Array
});

let user = mongoose.model('manager_user', userSchema);

module.exports = user;