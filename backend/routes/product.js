const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/product');
const multer = require('multer');

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

productRouter.get('/', function(req, res){
    productController.getProductList(req, res);
});

productRouter.post('/add', upload.single('imageUrl'),  function(req, res){
    productController.addProduct(req, res);
});

productRouter.post('/remove',  function(req, res){
    productController.removeProduct(req, res);
});

module.exports = productRouter;
