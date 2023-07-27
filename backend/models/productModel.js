const mongoose = require('mongoose');

//ProductSchema
const productSchema = new mongoose.Schema({
    _id : String,
    name: String,
    categoryName: String,
    stock: Number,
    price: Number,
    imageUrl: String,
});

module.exports = mongoose.model("Product", productSchema);