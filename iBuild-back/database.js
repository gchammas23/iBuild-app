let config = require("./config/config");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://" + config.config.HOST + ":" + config.config.PORT;
let mongodb;

let database = config.config.Database;

let usersCollection = config.config.UsersCollection;
let customersCollection = config.config.CustomersCollection;
let productsCollection = config.config.ProductsCollection;
let ordersCollection = config.config.OrdersCollection;
let templatesColletion = config.config.TemplatesCollection;

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    mongodb = db;
    console.log("Connection successful");
});

module.exports = {
    get: function () {
        return mongodb;
    },

    getDatabase: function () {
        return database;
    },

    getUsersCollection: function () {
        return usersCollection;
    },

    getCustomersCollection: function () {
        return customersCollection;
    },

    getProductsCollection: function () {
        return productsCollection;
    },

    getOrdersCollection: function () {
        return ordersCollection;
    },

    getTemplatesCollection: function () {
        return templatesColletion;
    }
};