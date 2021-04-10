const mongoose = require("mongoose");
const productSchema  = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    stock : {
        type : Number
    },
    price : {
        type : Number,
        min: 1000
    },
    description : {
        type : String
    }
})

module.exports = mongoose.model('Product',productSchema)