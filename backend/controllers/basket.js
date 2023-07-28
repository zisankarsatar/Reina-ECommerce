const Basket = require('../models/basketModel');
const Product = require('../models/productModel');
const {v4:uuidv4} = require('uuid');

//Basket getAll
module.exports.getBasketList = async function(req, res){
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
}

//Basket Add
module.exports.addBasket = async function(req, res){
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
}

//Basket remove item
module.exports.removeBasket = async function(req, res){
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
}