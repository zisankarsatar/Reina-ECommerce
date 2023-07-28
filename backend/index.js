const express = require('express');
const cors = require('cors');
const db = require('./db');
const {v4:uuidv4} = require('uuid');
const path = require("path");
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const Basket = require('./models/basketModel');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/auth', authRouter);
app.use("/products", productRouter);

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
});

//Basket gelAll
app.post('/baskets/getAll', async(req, res)=>{
    try {
        const {userId} = req.body;
        const baskets = await Basket.aggregate([
            {
                $match:{userId:userId}
            },
            {
                $lookup:{
                    from:"products",
                    localField:"productId",
                    foreignField:"_id",
                    as:"products"
                }
            }
        ]);
        res.json(baskets);
        
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

//Basket remove item
app.post('/baskets/remove', async(req, res)=>{
    try {
        const {_id} = req.body;
        const basket = await Basket.findById(_id);
        const product = await Product.findById(basket.productId);
        product.stock +=1;
        await Product.findByIdAndUpdate(product._id, product);
        await Basket.findByIdAndRemove(_id);
        res.json({message: "Deletion successful."});        
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

//Order Create
app.post('/orders/add', async(req, res)=>{
    try {
        const {userId} = req.body;
        const baskets = await Basket.find({userId: userId});
        for(const basket of baskets){
            let order = new Order({
                _id: uuidv4(),
                productId: basket.productId,
                userId: userId
            });
            order.save();
            await Basket.findByIdAndRemove(basket._id);
        }
        res.json({message: "Order create successful."});        
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

//Order List
app.post('/orders', async(req, res)=>{
    try {
        const {userId} = req.body;
        const orders = await Order.aggregate([
            {
                $match: {userId: userId}
            },
            {
                $lookup:{
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "products"
                }
            }
        ]);
        res.json(orders);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

const port = 3001;
app.listen(3001, ()=>{
    console.log("Application running on " + port +" port.")
})
