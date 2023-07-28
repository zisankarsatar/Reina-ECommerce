const express = require("express");
const basketRouter = express.Router();
const basketController = require('../controllers/basket');

basketRouter.post('/getAll', function(req, res){
    basketController.getBasketList(req,res);
});

basketRouter.post('/add', function(req, res){
    basketController.addBasket(req,res);
});

basketRouter.post('/remove', function(req, res){
    basketController.removeBasket(req, res);
});

module.exports = basketRouter;