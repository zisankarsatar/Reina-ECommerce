const mongoose = require('mongoose');

//OrderSchema
const orderSchema = new mongoose.Schema({
    _id : String,
    productId: String,
    userId: String
});

module.exports = mongoose.model("Order", orderSchema);