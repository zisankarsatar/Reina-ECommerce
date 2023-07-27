const mongoose = require('mongoose');

//BasketSchema
const basketSchema = new mongoose.Schema({
    _id : String,
    productId: String,
    userId: String
});

module.exports= mongoose.model("Basket", basketSchema);