const moongose = require('mongoose');

//UserSchema
const userSchema = new mongoose.Schema({
    _id : String,
    name: String,
    email: String,
    password: String,
});

const User = moongose.model("User", userSchema);

//ProductSchema
const productSchema = new mongoose.Schema({
    _id : String,
    name: String,
    stock: Number,
    price: Number,
    imgUrl: String,
});

const Product = moongose.model("Product", productSchema);

//BasketSchema
const basketSchema = new mongoose.Schema({
    _id : String,
    productId: String,
    userId: String,
    count: Number,
    price: Number,
});

const Basket = moongose.model("Basket", basketSchema);

//OrderSchema
const orderSchema = new mongoose.Schema({
    _id : String,
    productId: String,
    userId: String,
    count: Number,
    price: Number,
});

const Order = moongose.model("Order", orderSchema);

export {User, Order, Product, Basket};
