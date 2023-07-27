const express = require('express');
const authRouter = express.Router();
const auth = require('../controllers/auth');

authRouter.post('/register', function(req, res){
    auth.register(req,res);
});

authRouter.post('/login', function(req, res){
    auth.login(req,res);
});

module.exports = authRouter;