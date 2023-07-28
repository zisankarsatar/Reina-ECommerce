const Product = require('../models/productModel');
const {v4:uuidv4} = require('uuid');

//product list
module.exports.getProductList = async function(req, res){
    try {
        const products = await Product.find({}).sort({name: 1});
        res.json(products)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
};

//Add Product
module.exports.addProduct = async function(req, res){
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
}

//Remove Produt
module.exports.removeProduct = async function(req, res){
    try {
        const {_id} = req.body;
        await Product.findByIdAndRemove(_id);
        res.json({message: "Product removal successful."})
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
