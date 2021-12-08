const mongoose = require('mongoose');

//SCHEMA BUILD
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum: ['fruit', 'vegetable', 'dairy']
    }
});

//MODEL AND EXPORT.
const Product = mongoose.model('Product', productSchema);
module.exports = Product;

