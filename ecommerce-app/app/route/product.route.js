const express = require('express');
const route = express.Router();
const mysql = require('../dbconfig/dbconfig');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: 'upload/' });


route.post('/createProduct', upload.single('file'), async (req, res) => {
    const productList = {
        'category': req.body.category,
        'productName': req.body.productName,
        'price': req.body.price,
        'offer': req.body.offer,
        'starRate': req.body.starRate,
        'image': req.file,
    };

    const insertProduct = 'INSERT INTO product SET?';
    mysql.query(insertProduct, productList, (error, result) => {
        if (error) throw error;

        if (!productList) {
            console.log('product is empty');
        }

        return res.send({
            message: 'Product created successfully.', status: 200
        });
    });
});


route.get('/getProduct', (req, res) => {
    const getProduct = 'select * from product';
    mysql.query(getProduct, (error, result) => {
        if (error) throw error;
        return res.send(result);
    });
});


route.get('/getProductByCategory/:category', (req, res) => {
    const category = req.params.category;

    const getProductByCategory = "select * from product where category = ?";
    mysql.query(getProductByCategory, category, (error, result) => {
        if (error) throw error;

        return res.send(result);
    });
})

module.exports = route;
