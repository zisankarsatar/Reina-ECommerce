const mongoose = require('mongoose');

const MONGO_USERNAME = 'zisan';
const MONGO_PASSWORD = '1';
const MONGO_DB = 'reinaecommerce';

const uri= `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_DB}.qoclgep.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri).then(res => {
    console.log('Database connection successful');
}).catch(err => {
    console.log(err.message);
})
