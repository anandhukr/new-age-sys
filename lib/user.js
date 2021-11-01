const UserModel = require("../models/UserModel");
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
var config = require('../config');
const salt = 5//any salt value for hash

let userModel = {
    signup: function(args){
        let Users = new UserModel();
        Users.user_name = args.name;
        Users.email = args.email;
        Users.password = args.password;
        Users.role = args.role;
        return Users.save();
    },

    setHashPassword: function(password){
        return new Promise((resolve, reject)=>{
            console.group('inside setHashPassword');
        bcrypt.hash(password,salt,(err,hash)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(hash);
            }
        })
        })
        

    },

    login :function(args){
        return new Promise((resolve, reject)=>{
        console.log('inside login');
        let query = {
            email:args.email
        }
        UserModel.find(query,(err, data)=>{
            if(err){
                reject(err)
            }
            else{
                console.log('data->',data);
                if(data && data.length > 0){
                    bcrypt.compare(args.password,data[0].password,(hashErr,hash)=>{
                        if(hashErr){
                            reject(hashErr)
                        }
                        else{
                            console.log('hash->',hash);
                            if(hash){
                                const token = jwt.sign({
                                      email : data[0].email
                                     },
                                       config.api.JWT_KEY);
                                       console.log('tokren->',token);
                                resolve({
                                    status:200,
                                    token:token,
                                    role:data[0].role,
                                    user_id:data[0]._id
                                })
                            }
                            else{
                                resolve({
                                    status:401,
                                    info:'Server error -Unauthorized'
                                })
                            }
                        }
                    })
                }
                else{
                    resolve({
                        status:401,
                        info:'No user user found'
                    })
                }
            }
        })
        })
        
    },

    
}
module.exports = userModel;