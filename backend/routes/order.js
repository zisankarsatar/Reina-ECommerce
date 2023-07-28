const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/order');

orderRouter.post('/', function(req, res){
    orderController.getOrderList(req, res);
});

module.exports = orderRouter;
