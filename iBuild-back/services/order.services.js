/**
 * Handle Order Actions.
 */

var bcrypt = require("bcryptjs");
const e = require("express");
var moment = require("moment");

const { MongoClient, ObjectID } = require("mongodb");
let db = require("../database");

exports.getDates = (req, res) => {
    const { user } = req.body;

    var dbo = (db.get()).db(db.getDatabase());

    var query = { user: user };

    dbo.collection(db.getOrdersCollection()).find(query, {
        projection: {
            _id: 0,
            date: 1,
        }
    }).toArray(function (err, result) {
        if (err) throw (err)
        var dates = [];
        let found = false;
        for (let i = 0; i < result.length; i++) {
            found = false;
            if (dates.length === 0) dates.push(result[0].date);
            for (let j = 0; j < dates.length && j < result.length; j++) {
                if (dates[j] === result[i].date) found = true;
            }
            if (!found) dates.push(result[i].date);
        }
        res.status(200).send(dates);
    });
};

exports.getPrices = (req, res) => {
    const { user } = req.body;
    const { dates } = req.body;

    var dbo = (db.get()).db(db.getDatabase());

    var query = { user: user };

    dbo.collection(db.getOrdersCollection()).find(query, {
        projection: {
            _id: 0,
            totalPrice: 1,
            date: 1,
        }
    }).toArray(function (err, result) {
        if (err) throw (err)

        var prices = [];
        var total = 0;
        for (let i = 0; i < dates.length; i++) {
            for (let j = 0; j < result.length; j++) {
                if (dates[i] === result[j].date) total += result[j].totalPrice;
            }
            prices.push(total);
            total = 0;
        }

        res.status(200).send(prices);
    });
};

exports.getAverageOrders = (req, res) => {
    const { user } = req.body;
    const { dates } = req.body;

    var dbo = (db.get()).db(db.getDatabase());

    var query = { user: user };

    dbo.collection(db.getOrdersCollection()).find(query, {
        projection: {
            _id: 0,
            totalPrice: 1,
            date: 1,
        }
    }).toArray(function (err, result) {
        if (err) throw (err)

        var averages = [];
        var numberOfOrders = [];
        var total = 0;
        var count = 0;
        for (let i = 0; i < dates.length; i++) {
            for (let j = 0; j < result.length; j++) {
                if (dates[i] === result[j].date) {
                    total += result[j].totalPrice;
                    count++;
                }
            }
            averages.push(total / count);
            numberOfOrders.push(count);
            count = 0;
            total = 0;
        }
        var obj = {
            averages: averages,
            numberOfOrders: numberOfOrders
        }
        res.status(200).send(obj);
    });
};

exports.getTotal = (req, res) => {
    const { user } = req.body;

    var dbo = (db.get()).db(db.getDatabase());
    var total = 0;
    var obj = {};

    var query = { user: user };

    dbo.collection(db.getOrdersCollection()).find(query, {
        projection: {
            _id: 0,
            totalPrice: 1,
        }
    }).toArray(function (err, result) {
        if (err) throw (err)
        for (let count = 0; count < result.length; count++) {
            total += result[count].totalPrice;
        }

        obj = {
            result: result,
            total: total
        }
        res.status(200).send(obj);
        //console.log(obj);
    });
};

exports.getTotalOrders = (req, res) => {
    const { user } = req.body;

    var dbo = (db.get()).db(db.getDatabase());
    var obj = {};
    var avg = 0;

    var query = { user: user };

    dbo.collection(db.getOrdersCollection()).find(query, {
        projection: {
            _id: 0,
            totalPrice: 1,
        }
    }).toArray(function (err, result) {
        if (err) throw (err);

        for (let count = 0; count < result.length; count++) {
            avg += result[count].totalPrice;
        }

        obj = {
            average: (avg / result.length).toFixed(0),
            total: result.length
        }
        res.status(200).send(obj);
    });
};

exports.insertOrder = (req, res) => {
    const { user } = req.body;
    const { products } = req.body;
    const { notes } = req.body;
    const { totalPrice } = req.body;
    const { customer } = req.body;
    const { date } = req.body;
    const { orderStatus } = req.body;

    let order = {
        user: user,
        products: products,
        notes: notes,
        totalPrice: totalPrice,
        customer: customer,
        status: orderStatus,
        date: moment(date).format("DD-MM-YYYY"),
    }

    var dbo = (db.get()).db(db.getDatabase());
    dbo.collection(db.getOrdersCollection()).insertOne(order, function (err, result) {
        if (err) throw err;
        res.status(200).send({ message: "success", result });
    })
}

exports.getOrders = (req, res) => {
    const { user } = req.body;

    let whereClause = { user: user };

    var dbo = (db.get()).db(db.getDatabase());
    dbo.collection(db.getOrdersCollection()).find(whereClause).toArray(function (err, result) {
        if (err) throw err;

        res.status(200).send(result);
    })
}

exports.deleteOrder = (req, res) => {
    const {id} = req.body;
    const {user} = req.body;

    let order = {
        _id: ObjectID(id),
        user: user,
    }

    var dbo = (db.get()).db(db.getDatabase());

    dbo.collection(db.getOrdersCollection()).deleteOne(order, function (err, result) {
        if (err) throw err;
        if (result.result.n > 0) {
            res.status(200).send({ message: "success" });
        }
        else {
            res.status(500).send({ message: "error" });
        }
    })
}

exports.findOrderById = (req, res) => {
    const {id} = req.body;
    const {user} = req.body;

    let whereClause = {_id: ObjectID(id), user: user};

    var dbo = (db.get()).db(db.getDatabase());
    dbo.collection(db.getOrdersCollection()).find(whereClause).toArray(function(err, result) {
        if(err) throw err;
        res.status(200).send({message: "success", order: result[0]});
    })
}

exports.updateOrder = (req, res) => {
    const {data} = req.body;

    let whereClause = {_id: ObjectID(data.id), user: data.user};

    let updatedValues = {
        $set: {
            customer: data.customer,
            products: data.products,
            notes: data.notes,
            totalPrice: data.totalPrice,
            date: moment(data.date).format("DD-MM-YYYY"),
            status: data.orderStatus,
        }
    }

    var dbo = (db.get()).db(db.getDatabase());
    dbo.collection(db.getOrdersCollection()).updateOne(whereClause, updatedValues, function(err, result) {
        if(err) throw err;
        res.status(200).send({message: "success"});
    })
}