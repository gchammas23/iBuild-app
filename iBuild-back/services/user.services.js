/**
 * Handle USER Actions.
 */

//var jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs")
var moment = require("moment");

const { MongoClient } = require("mongodb");
let db = require("../database");

let utilities = require("../utilities/utilities");


exports.createUser = (req, res) => {
    const { name } = req.body;
    const { email } = req.body;
    const { username } = req.body;
    const { password } = req.body;

    var dbo = (db.get()).db(db.getDatabase());
    if(name.length !== 0 && email.length !== 0 && username.length !== 0 && password.length !== 0){
        var myobj = {
            name: name,
            email: email,
            username: username,
            password: password,
        };
        if(!utilities.validateEmail(email)) {
            res.status(200).send({message: "Please make sure to enter a valid email address!"})
        }
        else if(utilities.checkPassword(password)){
            dbo.collection(db.getUsersCollection()).insertOne(myobj, function (err, result) {
                if (err) throw err;
                res.status(200).send(result);
                console.log("1 document inserted");
            });
        }
        else{
            res.status(200).send({message: "Please make sure to enter an 8 character password which contains an uppercase letter and a digit!"})
        } 
    }
    else{
        res.status(200).send({message: "Please make sure to fill all fields before proceeding!"});
    }
}

exports.authenticateUser = (req, res) => {
    const { username } = req.body;
    const { password } = req.body;

    if(username.length !== 0 && password.length !== 0){
        var myobj = {
            username: username,
            password: password,
        };
        var dbo = (db.get()).db(db.getDatabase());
    
        console.log(myobj);
        dbo.collection(db.getUsersCollection()).findOne(myobj, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.status(200).send({result});
        });
    }
    else{
        res.status(200).send({message: "Please make sure to fill all fields to login."});
    }
    
};

exports.authenticate = (req, res) => {
    const { username } = req.body;
    const { email } = req.body;

    var dbo = (db.get()).db(db.getDatabase());

    dbo.collection(db.getUsersCollection()).findOne({$or: [{username: username}, {email: email}]}, function(err, result) {
        if (err) throw err;
        res.status(200).send(result);
    });
};