
const User = require('../lib/user');


const userController = {

    signup : async function(req, res){
        try{
            console.log('req.body->',req.body);
        console.log('inside signup function');
        let email = req.body.email;
        let name = req.body.name;
        let password = req.body.password;
        let role = req.body.role;

        let hashPassword = await User.setHashPassword(password);
        console.log('hashPassword->',hashPassword);
        let arg = {
            email: email,
            name: name,
            password: hashPassword,
            role: role 
        };
        console.log('arg->',arg)
        var a = await User.signup(arg);
        console.log('a->',a);
        return res.send({
            status:200,
            info:'user saved successfully'})

        }
        catch(err){
            console.log('error->',err);
            return res.send({
                status:500,
                info:'Server error'
            })
        }
        
    },

    login: async function(req, res){
        try{
        console.log('inside login');
        let email = req.body.email;
        let password = req.body.password;
        let args = {
            email: email,
            password: password
        }
        let loginData = await User.login(args);
        return res.send(loginData);
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

module.exports = userController;