const jwt = require('jsonwebtoken');
//var auth = require('basic-auth');
var config = require('../config');
//require('dotenv').config();
const UserModel = require("../models/UserModel");
const mongoose = require('mongoose');

let validate = {

validateJwt :function (req, res, next) {
    
    try{
         
       
            const token = req.header('x-auth-header')
            console.log("\n token",token,'\n')
            const decoded = jwt.verify(token,config.api.JWT_KEY)
            console.log('jwt key :',decoded);
            next();
        
    }
    catch(error){
      return res.status(401).json({message:'Auth failed'})
    }
    
},

getRole: async function(req, res, next){
    try{
        console.log('inside getRole');
    const {user_id} = req.query;
    let data = await UserModel.find({_id:mongoose.Types.ObjectId(user_id)}).exec();
    console.log('data',data);
    console.log('data',data);
    req.role = data[0].role ? data[0].role : '';
    next() 
    }
    catch(err){
        console.log('err->',err);
        return res.send({
            status:500,
            info:'Server error'
        })
    }
    

}

}
module.exports = validate;