const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const Product = require('../models/product.model');

router.get('/products', async (req, res) => {
  try {
    res.json(await Product.find());
  }
  catch (err) {
    res.status(500).json({ message: err});
  }
});

router.get('/products/random', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const prod = await Product.findOne().skip(rand);
    if(!prod) res.status(404).json({
      message: 'Not found...'
    });
    else res.json(prod);
  }
  catch(err) {
    res.status(500).json({message: err});
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) res.status(404).json({message: 'Not found...'});
    else res.json(prod);
  }
  catch (err) {
    res.status(500).json({message: err});
  }
});

router.post('/products', (req, res) => {
  try {
    const {name, client} = req.body;
    const newProduct = new Product({name: name, client: client});
    await newProduct.save();
    res.json({ message: 'Product saved!'});
  }
  catch (err) {
    res.status(500).jsomn({message: err});
  }
});

router.put('/products/:id', (req, res) => {
  const { name, client } = req.body;

  try {
    const prod = await (Product.findById(req.params.id));
    if(prod) {
      await Product.updateOne({_id: req.params.id}, {$set: {name: name, client: client}});
      res.json({message: 'Product changed!'});
    } 
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const prod = await(Product.findById(req.params.id));
    if (prod) {
      await Product.deleteOne({_id: req.params.id});
      res.json({message: 'You have just deleted a product!'});
    }
    else res.status(404).json({ message: 'Not found...'});
  }
  catch(err) {
    res.status(500).json({ message: err});
  }
});

module.exports = router;
