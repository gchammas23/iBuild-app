var express = require('express');
var router = express.Router();

const product = require('../services/product.services');

router.post('/addProduct', product.addProduct);
router.post('/getUserProducts', product.getUserProducts);
router.post('/deleteUserProduct', product.deleteProduct);
router.post('/findProductBySKU', product.getProductDetailsBySku);
router.post('/findProductByID', product.findProductByID)
router.post('/editProduct', product.editProduct);
router.post('/getProductNames', product.getProductNames);
router.post('/getProductPrice', product.getProductPrice);
router.post('/getInventory', product.getInventoryProducts);
router.post('/updateQuantity', product.updateProductQuantity);
router.post('/deduceQuantities', product.deduceQuantities);
module.exports = router