var express = require('express');
var router = express.Router();

const customer = require('../services/customer.services');

router.get('/customers', customer.getCustomers);
router.post('/user', customer.getCustomersUser);
router.post('/add', customer.createCustomer);
router.post('/authenticate', customer.authenticate);
router.post('/delete', customer.deleteCustomer);
router.post('/update', customer.updateCustomer);
router.post('/getNames', customer.getCustomersFullName);

module.exports = router