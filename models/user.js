const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    // username: { type: String, required: true },   // ADD THIS
    email: { type: String, required: true }
});

// 🚀 IMPORTANT — plugin (NO .default)
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
