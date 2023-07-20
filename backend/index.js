const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const {v4:uuidv4} = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const uri= "mongodb+srv://zisan:1@reinaecommerce.qoclgep.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri).then(res => {
    console.log('Database connection successful');
}).catch(err => {
    console.log(err.message);
})

const port = 3001;
app.listen(3001, ()=>{
    console.log("Application running on " + port +" port.")
})

