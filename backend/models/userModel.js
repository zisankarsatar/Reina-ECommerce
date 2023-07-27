const mongoose = require('mongoose');

//UserSchema for DB
const userSchema = new mongoose.Schema({
    _id : String,
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean
});

module.exports = mongoose.model('User', userSchema);
