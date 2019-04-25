const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var meanSchema = new Schema({
    userName: {type: String,
                index: true,
                required: true,
                unique: true,
                lowercase: true,
                maxlength: 50},
    password: {type: String,
                required: true},
    firstName : {type: String,maxlength: 50},
    lastName : {type: String,maxlength: 50},
    profileImage :{binData: 'buffer', type: String},
    interests:{type: String,maxlength: 2000},
    state: {type: String,maxlength: 52}
}, {collection: 'profiles'});

exports.meanSchema = meanSchema;