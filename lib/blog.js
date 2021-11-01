const BlogModel = require('../models/BlogModel');
const mongoose = require('mongoose');


let blogModel = {
    addBlog: function(args){
        let Blogs = new BlogModel();
        Blogs.title = args.title;
        Blogs.description = args.description;
        Blogs.category_id = mongoose.Types.ObjectId(args.category_id);
        Blogs.publisher_id = mongoose.Types.ObjectId(args.publisher_id);
        
        return Blogs.save()
    },

    listBlog: function(query){
        return BlogModel.find(query).exec();
    },

    updateBlog: function(args){
        let query = {
            _id : mongoose.Types.ObjectId(args.id)
        }
        let update = {
            title: args.title,
            description: args.description,
            category_id: args.category_id,
            publisher_id: args.publisher_id
        }

        return BlogModel.update(query, update).exec();
    },

    deleteBlog: function(id){
        let query = {
            _id: mongoose.Types.ObjectId(id)
        }
        return BlogModel.deleteOne(query).exec();
    },

    checkBlogOwner: function(user_id, category_id){
        return BlogModel.find({publisher_id:user_id, category_id:category_id}).exec()
    }
}
module.exports = blogModel;