const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const {v4:uuidv4} = require('uuid');
const jwt = require('jsonwebtoken');
const path = require("path");
//const {User, Product, Basket, Order} = require('./schema');

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
    isAdmin: Boolean
});

const User = mongoose.model("User", userSchema);

//ProductSchema
const productSchema = new mongoose.Schema({
    _id : String,
    name: String,
    categoryName: String,
    stock: Number,
    price: Number,
    imageUrl: String,
});

const Product = mongoose.model("Product", productSchema);

//BasketSchema
const basketSchema = new mongoose.Schema({
    _id : String,
    productId: String,
    userId: String
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

//product list
app.get("/products", async(req, res) =>{
    try {
        const products = await Product.find({}).sort({name: 1});
        res.json(products)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//file save
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,  "uploads/")
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({storage: storage});

//Add Product
app.post("/products/add" , upload.single('imageUrl'), async(req, res)=>{
    try {
        const {name, categoryName, stock, price} = req.body;
        const product = new Product({
            _id: uuidv4(),
            name: name,
            stock: stock,
            price: price,
            categoryName: categoryName,
            imageUrl: req.file.path,
        });

        await product.save();
        res.json({message: "Product registration successful."})
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

//Remove Produt
app.post('/products/remove', async(req, res)=>{
    try {
        const {_id} = req.body;
        await Product.findByIdAndRemove(_id);
        res.json({message: "Product removal successful."})
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

//Basket Add
app.post('/baskets/add', async(req, res)=>{
    try {
        const {productId, userId} = req.body;
        const basket = new Basket({
            _id: uuidv4(),
            productId: productId,
            userId: userId
        });

        await basket.save();

        let product = await Product.findById(productId);
        product.stock = product.stock - 1;
        await Product.findByIdAndUpdate(productId, product);

        res.json({message: "Basket added successful."})

    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

const port = 3001;
app.listen(3001, ()=>{
    console.log("Application running on " + port +" port.")
})
