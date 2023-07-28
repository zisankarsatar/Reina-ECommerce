const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require("path");
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const basketRouter = require('./routes/basket');
const orderRouter = require('./routes/order');

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/auth', authRouter);
app.use("/products", productRouter);
app.use('/baskets', basketRouter);
app.use('/orders', orderRouter);

const port = 3001;
app.listen(3001, ()=>{
    console.log("Application running on " + port +" port.")
})
