const Product = require('./models/product');
const mongoose = require('mongoose');
const product = require('./models/product');

//CONNECTION TO DATABASE
mongoose.connect('mongodb://localhost:27017/farm')
    .then(() => {
        console.log('MONGO CONNECTION OPEN!!!');
    })
    .catch((e) => {
        console.log('Connection went wrong!', e);
    });

/*
/////////////////////////////
///////////VALUES////////////
/////////////////////////////
*/

const rubyGrapeGruit = new Product({
    name: 'Ruby Grapefruit',
    price: 1.99,
    category: 'fruit'
})

const organicMelon = new Product({
    name: 'Organic Melon',
    price: 2.25,
    category: 'fruit'
})

const fairyEggplant = new Product({
    name: 'Fairy Eggplant',
    price: 1.00,
    category: 'vegetable'
})

const chocolateMilk = new Product({
    name: 'Chocolate Whole Milk',
    price: 2.69,
    category: 'dairy'
})

Product.insertMany([rubyGrapeGruit, organicMelon, fairyEggplant, chocolateMilk])
    .then(() => {
        console.log('Insert was successful.');
    })
    .catch((err) => {
        console.log('There was an error inserting the data: ', err);
    });