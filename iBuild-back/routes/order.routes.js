var express = require('express');
var router = express.Router();

const order = require('../services/order.services');

router.post('/addOrder', order.insertOrder);
router.post('/getOrders', order.getOrders);
router.post('/deleteOrder', order.deleteOrder);
router.post('/getDates', order.getDates);
router.post('/getPrices', order.getPrices);
router.post('/getTotal', order.getTotal);
router.post('/getTotalOrders', order.getTotalOrders);
router.post('/getAverageOrder', order.getAverageOrders);
router.post('/findOrderById', order.findOrderById);
router.post('/updateOrder', order.updateOrder);

module.exports = router