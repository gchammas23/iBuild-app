/**
 * Handle Customer Actions.
 */

var bcrypt = require("bcryptjs")
var moment = require("moment");

const { MongoClient } = require("mongodb");
let db = require("../database");
let utilities = require("../utilities/utilities");

exports.getCustomers = (req, res) => {
    var dbo = (db.get()).db(db.getDatabase());
    dbo.collection(db.getCustomersCollection()).find({}).toArray(function (err, result) {
        if (err) throw (err)
        res.status(200).send({ data: result, message: 'success' });
        console.log(result);
    });
};

exports.getCustomersUser = (req, res) => {
    const { user } = req.body;

    var dbo = (db.get()).db(db.getDatabase());
    var query = { user: user };

    dbo.collection(db.getCustomersCollection()).find(query).toArray(function (err, result) {
        if (err) throw (err)
        res.status(200).send(result);
        console.log(result);
    });
};

exports.createCustomer = (req, res) => {
    const { user } = req.body;
    const { name } = req.body;
    const { lastname } = req.body;
    const { email } = req.body;
    const { phone } = req.body;
    const { address } = req.body;
    const { building } = req.body;
    const { notes } = req.body;

    var dbo = (db.get()).db(db.getDatabase());
    var myobj = {
        user: user,
        name: name,
        lastname: lastname,
        email: email,
        phone: phone,
        address: address,
        building: building,
        notes: notes
    };
    if (!utilities.validateEmail(email)) {
        res.status(200).send({ message: "Please make sure to enter a valid email address!" })
    }
    else if (utilities.validateExtension(phone)) {
        res.status(200).send({ message: "Phone number must start with +961" })
    }
    else if (utilities.validatePhoneNumber(phone)) {
        res.status(200).send({ message: "Please make sure to enter a valid phone number!" })
    }
    else {
        dbo.collection(db.getCustomersCollection()).insertOne(myobj, function (err, result) {
            if (err) throw err;
            res.status(200).send(result);
            console.log("1 document inserted");
        });
    }
}

exports.authenticate = (req, res) => {
    const { name } = req.body;
    const { lastname } = req.body;
    const { email } = req.body;
    const { phone } = req.body;
    const { address } = req.body;
    const { building } = req.body;

    var dbo = (db.get()).db(db.getDatabase());
    var myobj = {
        name: name,
        lastname: lastname,
        email: email,
        phone: phone,
        address: address,
        building: building,
    };

    console.log(myobj);
    dbo.collection(db.getCustomersCollection()).findOne(myobj, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.status(200).send({ result });
    });
};

exports.deleteCustomer = (req, res) => {

    const { user } = req.body;
    const { name } = req.body;
    const { lastname } = req.body;
    const { email } = req.body;
    const { phone } = req.body;
    const { address } = req.body;
    const { building } = req.body;
    const { notes } = req.body;

    var dbo = (db.get()).db(db.getDatabase());

    var myobj = {
        user: user,
        name: name,
        lastname: lastname,
        email: email,
        phone: phone,
        address: address,
        building: building,
        notes: notes
    };

    console.log(myobj);
    dbo.collection(db.getCustomersCollection()).deleteOne(myobj, function (err, result) {
        if (err) throw err;
        res.status(200).send(result);
        console.log("1 document deleted");
    });
};

exports.updateCustomer = (req, res) => {
    const { user } = req.body;
    const { name } = req.body;
    const { field } = req.body;
    const { newValue } = req.body;

    var dbo = (db.get()).db(db.getDatabase());

    var myobj = {
        user: user,
        name: name
    }

    console.log(myobj);

    var newvalues = {};

    if (field === "name") {
        newvalues = {
            $set: {
                name: newValue,
            }
        }
    } else if (field === "lastname") {
        newvalues = {
            $set: {
                lastname: newValue,
            }
        }
    } else if (field === "email") {
        newvalues = {
            $set: {
                email: newValue,
            }
        }
    } else if (field === "phone") {
        newvalues = {
            $set: {
                phone: newValue,
            }
        }
    } else if (field === "address") {
        newvalues = {
            $set: {
                address: newValue,
            }
        }
    } else if (field === "building") {
        newvalues = {
            $set: {
                building: newValue,
            }
        }
    } else if (field === "notes") {
        newvalues = {
            $set: {
                notes: newValue,
            }
        }
    }

    if (field === "email") {
        if (!utilities.validateEmail(newValue)) {
            res.status(200).send({ message: "Please make sure to enter a valid email address!" })
        }
        else {
            dbo.collection(db.getCustomersCollection()).updateOne(myobj, newvalues, function (err, result) {
                if (err) throw err;
                res.status(200).send(result);
                console.log("1 document updated");
            });
        }
    }
    else if (field === "phone") {
        if (utilities.validateExtension(newValue)) {
            res.status(200).send({ message: "Phone number must start with +961" })
        }
        else if (utilities.validatePhoneNumber(newValue)) {
            res.status(200).send({ message: "Please make sure to enter a valid phone number!" })
        }
        else {
            dbo.collection(db.getCustomersCollection()).updateOne(myobj, newvalues, function (err, result) {
                if (err) throw err;
                res.status(200).send(result);
                console.log("1 document updated");
            });
        }
    }
    else {
        dbo.collection(db.getCustomersCollection()).updateOne(myobj, newvalues, function (err, result) {
            if (err) throw err;
            res.status(200).send(result);
            console.log("1 document updated");
        });
    }
};

exports.getCustomersFullName = (req, res) => {
    const { user } = req.body;

    var dbo = (db.get()).db(db.getDatabase());
    let whereClause = { user: user };

    dbo.collection(db.getCustomersCollection()).find(whereClause, { projection: { _id: 0, name: 1, lastname: 1 } }).toArray(function (err, result) {
        if (err) throw err;
        let fullNamesList = [];
        let fullName = "";

        fullNamesList.push({ label: "Select Customer", disabled: true });
        result.forEach(element => {
            fullName = element.name + " " + element.lastname;
            fullNamesList.push(fullName);
        });

        res.status(200).send({ message: "success", array: fullNamesList });
    })
}