const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const {v4:uuidv4} = require('uuid');

//Token
const secretKey = "Gizli anahtarim";
const option = {
    expiresIn: "1h"
}

//register
module.exports.register = async function(req, res){
    try{
        const {email, name, password} = req.body;
        let user = new User({
            _id : uuidv4(),
            name: name,
            email: email, 
            password: password,
            isAdmin: false,
        })
        await user.save();
        const payload = {
            user: user
        }

        const token = jwt.sign(payload, secretKey, option);
        res.json({"user":user, "token":token});
    }catch (error) {
        res.status(400).json({error: error.message});
    }
};

//login
module.exports.login = async function(req, res){
    try {
        const {email, password} = req.body;
        const users = await User.find({email: email, password: password});
        if(users.length === 0 ){
            res.status(400).json({messsage: "Username or password is wrong."})            
        }else{
            const payload = {
                user: users[0]
            }
            const token = jwt.sign(payload, secretKey, option);
            res.json({user:users[0], token:token})
        }
    } catch (error) {
        res.status(400).json({messsage: "Username or password is wrong."})            
    }
};