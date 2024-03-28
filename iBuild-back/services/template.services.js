/**
 * Handle Template Actions.
 */


const { MongoClient } = require("mongodb");
let db = require("../database");

exports.saveTemplate = (req, res) => {
    let template = req.body;

    template['gjs-components'] = JSON.parse(template['gjs-components'])
    template['gjs-styles'] = JSON.parse(template['gjs-styles'])
    template['user'] = req.params.user;


    var dbo = (db.get()).db(db.getDatabase());
    dbo.collection(db.getTemplatesCollection()).find({ user: req.params.user }).toArray(function (err, result) {
        if (err) throw err;
        if (result[0] !== undefined) {
            dbo.collection(db.getTemplatesCollection()).deleteOne({ user: req.params.user }, function (err, result) {
                if (err) throw err;
            });
        }

        dbo.collection(db.getTemplatesCollection()).insertOne(template, function (err, result) {
            if (err) throw err;
            res.status(200).send({ message: "success" });
        });
    });

}

exports.getTemplate = (req, res) => {
    let user = req.params.user;

    var dbo = (db.get()).db(db.getDatabase());
    dbo.collection(db.getTemplatesCollection()).find({ user: user }).toArray(function (err, result) {
        if (err) throw err;
        result[0] === undefined ? res.status(200).send({ message: "No saved template" }) :
            res.status(200).send({ message: "success", template: result[0] })
    });
}