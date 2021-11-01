const Category = require('../lib/category')
const categoryController = {
    
    addCategory: async function(req, res){
        try{
            if(req.role == 'User'){
                return res.send({
                    status:403,
                    info:'Unauthorized'

                })
            }
        console.log('insdie addCategory');
        let category_name = req.body.category_name;
        let data = await Category.addCategory(category_name);
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

    listCategory: async function(req, res){
        try{
            let category_list = await Category.listCategory();
            console.log('category_list->',category_list);
            return res.send({
                status:200,
                info:category_list
            })
        }
        catch(err){
            console.log('inside err->',err);
            return res.send({
                status:500,
                info:'Server error'
            })
        }
    },

    updateCategory: async function(req, res){
        try{
            console.log('inside updateCategory role->',req.role);
            if(req.role == 'User'){
                return res.send({
                    status:403,
                    info:'Unauthorized'

                })
            }
            console.log('inside updateCategory');
            let category_id = req.body.id;
            let category_name = req.body.category_name;

            let args = {
                id: category_id,
                category_name: category_name
            }
            console.log('args->',args);
            let update_category = await Category.updateCategory(args);
            console.log('update_category->',update_category);
            return res.send({
                status:200,
                info:"Update success"
            })
        }
        catch(err){
            console.log('inside err->',err);
            return res.send({
                status:500,
                info:'Server error'
            })
        }
    },

    deleteCategory: async function(req, res){
        try{
            if(req.role == 'User'){
                return res.send({
                    status:403,
                    info:'Unauthorized'

                })
            }
            console.log('insied delete');
            let {id} = req.params;
            console.log('id->',id);
            let delete_category = await Category.deleteCategory(id);
            console.log('delete category->',delete_category);
            return res.send({
                status:200,
                info:'Delete success'
            })
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

module.exports = categoryController;