const Order = require('../models/orderModel');

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