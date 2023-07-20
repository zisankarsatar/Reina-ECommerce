const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
//const multer = require('multer');
const {v4:uuidv4} = require('uuid');
const jwt = require('jsonwebtoken');
//const {User, Product, Basket, Order} = require('./schema');

const app = express();

app.use(cors());
app.use(express.json());

const uri= "mongodb+srv://zisan:1@reinaecommerce.qoclgep.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri).then(res => {
    console.log('Database connection successful');
}).catch(err => {
    console.log(err.message);
})

//UserSchema for DB
const userSchema = new mongoose.Schema({
    _id : String,
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

//ProductSchema
const productSchema = new mongoose.Schema({
    _id : String,
    name: String,
    stock: Number,
    price: Number,
    imgUrl: String,
});

const Product = mongoose.model("Product", productSchema);

//BasketSchema
const basketSchema = new mongoose.Schema({
    _id : String,
    productId: String,
    userId: String,
    count: Number,
    price: Number,
});

const Basket = mongoose.model("Basket", basketSchema);

//OrderSchema
const orderSchema = new mongoose.Schema({
    _id : String,
    productId: String,
    userId: String,
    count: Number,
    price: Number,
});

const Order = mongoose.model("Order", orderSchema);


//Token
const secretKey = "Gizli anahtarim";
const option = {
    expiresIn: "1h"
}

//register
app.post("/auth/register", async(req, res)=> {
    try{
        const {email, name, password} = req.body;
        let user = new User({
            _id : uuidv4(),
            name: name,
            email: email, 
            password: password
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
});

//login
app.post("/auth/login", async(req, res) => {
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
})

const port = 3001;
app.listen(3001, ()=>{
    console.log("Application running on " + port +" port.")
})
