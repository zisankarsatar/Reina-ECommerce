const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/order');

orderRouter.post('/', function(req, res){
    orderController.getOrderList(req, res);
});

orderRouter.post('/add', function(req, res){
    orderController.addOrder(req, res);
});

module.exports = orderRouter;
