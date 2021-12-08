const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const Product = require('./models/product');
const product = require('./models/product');
const methodOverride = require('method-override');


//CONNECTION TO DATABASE
mongoose.connect('mongodb://localhost:27017/farm')
    .then(() => {
        console.log('MONGO CONNECTION OPEN!!!');
    })
    .catch((e) => {
        console.log('Connection went wrong!', e);
    });


//EJS CONFIG
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//SERVER LISTEN ON PORT 3000
app.listen(3000, () => {
    console.log('APP IS LISTENING IN PORT 3000')
});

//GET ROUTING

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/products/modify', async (req, res) => {
    const products = await Product.find({});
    res.render('products/modify', { products });
});

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/edit', { product });
})

app.get('/products/new', (req, res) => {
    res.render('products/new');
});

app.get('/products/update', (req, res) => {
    res.render('products/update');
});

app.get('/products', async (req, res) => {
    const { categorySelector } = req.query;
    if (categorySelector) {
        const products = await Product.find({ category: categorySelector });
        res.render('products/index', { products });
    }
    else { const products = await Product.find({}); }
    const products = await Product.find({});
    res.render('products/index', { products });

});

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/details', { product });
});

//POST ROUTING
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect('/products');
});

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, req.body);
    res.redirect(`/`);
});

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/');
});