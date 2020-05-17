const mongoose = require('mongoose');

var Patient = mongoose.model('Patient', {
    name: { type: String },
    age: { type: Number },
    gender: { type: String },
    symptoms: { type: String },
    contact: { type: String },
    email: { type: String }
});

module.exports = { Patient };