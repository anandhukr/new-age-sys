const Blog = require('../lib/blog');
const mongoose = require('mongoose');
const blogController = {
    
    addBlog: async function(req, res){
        try{
        console.log('insdie addCategory');

        if(req.role == 'Admin'){
            return res.send({
                status:403,
                info:'Unauthorized'

            })
        }
        let title = req.body.title;
        let description = req.body.description;
        let category_id = req.body.category_id;
        let publisher_id = req.body.publisher_id;

        let args = {
            title: title,
            description: description,
            category_id: category_id,
            publisher_id: publisher_id
        }
        let data = await Blog.addBlog(args);
        console.log('data->',data);
        return res.send({
            status:200,
            info:"category added success"
        })
        }
        catch(err){
            console.log("err->",err);
            return res.send({
                status:500,
                info:'Server error'
            })
        }
        
        
    },

    listBlog: async function(req, res){
        try{
            if(req.role == 'Admin'){
                let query = {}
                let category_list = await Blog.listBlog(query);
            console.log('category_list->',category_list);
            return res.send({
                status:200,
                info:category_list
            })
            }
            else{
                //user_id will be set on revery request
                query = {
                    publisher_id:req.query.user_id
                }
                let category_list = await Blog.listBlog(query);
            console.log('category_list->',category_list);
            return res.send({
                status:200,
                info:category_list
            })

            }
            
        }
        catch(err){
            console.log('inside err->',err);
            return res.send({
                status:500,
                info:'Server error'
            })
        }
    },

    updateBlog: async function(req, res){
        try{
            if(req.role == 'Admin'){
                return res.send({
                    status:403,
                    info:'Unauthorized'
    
                })
            }
            
            console.log('inside updateCategory');
            let title = req.body.title;
            let description = req.body.description;
            let category_id = req.body.category_id;

            //every request have user_id which is returned while log in
            let user_id = req.query.user_id;
            let checkOwner = await Blog.checkBlogOwner(user_id,category_id)
            console.log('checkOwner->',checkOwner);
            if(checkOwner && checkOwner.length > 0){
                let args = {
                    title: title,
                    description: description,
                    category_id: mongoose.Types.ObjectId(category_id)
                }
                console.log('args->',args);
                let update_category = await Blog.updateBlog(args);
                
                console.log('update_category->',update_category);
                return res.send({
                    status:200,
                    info:"Update success"
                })
            }
            else{
                return res.send({
                    status:403,
                    info:"Unauthorized"
                })
            }

            
        }
        catch(err){
            console.log('inside err->',err);
            return res.send({
                status:500,
                info:'Server error'
            })
        }
    },

    deleteBlog: async function(req, res){
        try{
            console.log('insied delete');
            let {id} = req.params;
            console.log('id->',id);
            //every request have user_id which is returned while log in
            let user_id = req.query.user_id;
            let checkOwner = await Blog.checkBlogOwner(user_id,category_id)
            console.log('checkOwner->',checkOwner);
            if(checkOwner && checkOwner.length > 0){
            let delete_category = await Blog.deleteBlog(id);
            console.log('delete category->',delete_category);
            return res.send({
                status:200,
                info:'Delete success'
            })
            }
            else{
                return res.send({
                    status:403,
                    info:"Unauthorized"
                })
            }
            
        }
        catch(err){
            console.log('inside err->',err);
            return res.send({
                status:500,
                info:'Server error'
            })
        }
    }
}

module.exports = blogController;