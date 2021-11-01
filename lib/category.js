CategoryModel = require('../models/CategoryModel');
const mongoose = require('mongoose');


let categoryModel = {
    addCategory: function(cat_name){
        Categories = new CategoryModel();
        Categories.name = cat_name;
        return Categories.save()
    },

    listCategory: function(){
        return CategoryModel.find({}).exec();
    },

    updateCategory: function(args){
        let query = {
            _id : mongoose.Types.ObjectId(args.id)
        }
        let update = {
            name: args.category_name
        }

        return CategoryModel.update(query, update).exec();
    },

    deleteCategory: function(id){
        let query = {
            _id: mongoose.Types.ObjectId(id)
        }
        return CategoryModel.deleteOne(query).exec();
    }
}
module.exports = categoryModel;