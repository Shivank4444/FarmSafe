const mongoose = require('mongoose');

const connectToMongo = () => {mongoose.connect("mongodb+srv://jatinsinha03:admin@cluster0.5enu7dl.mongodb.net/?retryWrites=true&w=majority").then(() => {
        console.log('Connected to MongoDB');
    })}

module.exports = connectToMongo;