var mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title : {
        type: String
    },
    description : {
        type: String
    },
    category_id : {
        type: mongoose.Schema.Types.ObjectId, ref: 'category'
    },
    publisher_id : {
        type: mongoose.Schema.Types.ObjectId, ref: 'user'
    },
   
})

module.exports = mongoose.model('blog',blogSchema);