const Order = require('../models/orderModel');
const Basket = require('../models/basketModel'); 
const {v4:uuidv4} = require('uuid');

//Order List
module.exports.getOrderList = async function(req,res){
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
}

//Order Create
module.exports.addOrder = async function(req, res){
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
}
