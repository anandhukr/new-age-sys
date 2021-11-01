var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name : {
        type: String
    },
    email : {
        type: String,
        unique : true
    },
    password : {
        type: String
    },
    role : {
        type: String, enum: ['Admin', 'Publisher']
    },
})

module.exports = mongoose.model('user',userSchema);