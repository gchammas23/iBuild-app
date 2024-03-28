/**
 * Handle Products Actions.
 */

 const { ObjectID } = require("mongodb");
let db = require("../database");


 exports.getUserProducts = (req, res) => {
    const { user } = req.body;

    var dbo = (db.get()).db(db.getDatabase());

    dbo.collection(db.getProductsCollection()).find({user: user}).toArray(function (err, result) {
        if (err) throw (err)
        res.status(200).send(result);
    });
};

 exports.addProduct = (req, res) => {
     let {user} = req.body.data;
     let {product_title} = req.body.data;
     let {product_description} = req.body.data;
     let {product_price} = req.body.data;
     let {product_type} = req.body.data;
     let {past_price} = req.body.data;
     let {cost_per_item} = req.body.data;
     let {product_status} = req.body.data;
     let {product_sku} = req.body.data;
     let {product_vendor} = req.body.data;
     let {product_quantity} = req.body.data;

     let product = {
         user: user,
         title: product_title,
         description: product_description,
         price: parseInt(product_price),
         past_price: parseInt(past_price),
         cost_per_item: parseInt(cost_per_item),
         status: product_status,
         sku: product_sku,
         vendor: product_vendor,
         quantity: parseInt(product_quantity),
         type: product_type,
     }

     var dbo = (db.get()).db(db.getDatabase());
     dbo.collection(db.getProductsCollection()).insertOne(product, function(err, result) {
         if(err) throw err;
         res.status(200).send({result, message: "success"});
     })
 }

 exports.editProduct = (req, res) => {
    let {user} = req.body;
    let {product_title} = req.body;
    let {product_description} = req.body;
    let {product_price} = req.body;
    let {product_type} = req.body;
    let {past_price} = req.body;
    let {cost_per_item} = req.body;
    let {product_status} = req.body;
    let {product_sku} = req.body;
    let {product_vendor} = req.body;
    let {product_quantity} = req.body;
    let {id} = req.body;


    let whereClause = {user: user, _id: ObjectID(id)};

    let newValues = { $set: 
        {title: product_title, 
        description: product_description, 
        price: parseInt(product_price), 
        past_price: parseInt(past_price),
        cost_per_item: parseInt(cost_per_item),
        type: product_type,  
        status: product_status,
        sku: product_sku,
        vendor: product_vendor,
        quantity: parseInt(product_quantity),
        } 
    }

    var dbo = (db.get()).db(db.getDatabase());
    dbo.collection(db.getProductsCollection()).updateOne(whereClause, newValues, function(err, result) {
        if(err) throw err;
        res.status(200).send({message: "success"});
    })
}

 exports.deleteProduct = (req, res) => {
     const {sku} = req.body;
     const {user} = req.body;

     var dbo = (db.get()).db(db.getDatabase());
     dbo.collection(db.getProductsCollection()).deleteOne({sku: sku, user: user}, function(err, result) {
         if(err) throw err;
         if(result.result.n > 0){
             res.status(200).send({message: "success"});
         }
         else{
             res.status(500).send({message: "error"});
         }
     });
 }

 exports.getProductDetailsBySku = (req, res) => {
     const {user} = req.body;
     const {sku} = req.body;

     var dbo = (db.get()).db(db.getDatabase());
     dbo.collection(db.getProductsCollection()).find({user: user, sku: sku}).toArray(function(err, result) {
         if(err) throw err;
         if(result.length > 0){
             res.status(200).send({message: "success", array: result});
         }
         else{
             res.status(200).send({message: "error"});
         }
     })
 }


 exports.getProductNames = (req, res) => {
     const {user} = req.body;

     let whereClause = {user: user, quantity: {$gt: 0}, status: "active"};

     var dbo = (db.get()).db(db.getDatabase());
     dbo.collection(db.getProductsCollection()).find(whereClause, {projection: {_id: 0, title: 1, sku: 1}}).toArray(function(err, result) {
        if(err) throw err;

        let productList = [];
        productList.push({label: "Select Product", disabled: true});

        result.forEach(element => {
            productList.push({
                label: element.title,
                value: element.sku,
            })
        });

        res.status(200).send({message: "success", array: productList});
     })
 };

 exports.getProductPrice = (req, res) => {
     const {user} = req.body;
     const {sku} = req.body;

     let whereClause = {user: user, sku: sku};

     var dbo = (db.get()).db(db.getDatabase());
     dbo.collection(db.getProductsCollection()).find(whereClause, {projection: {_id: 0, price: 1}}).toArray(function(err, result) {
         if(err) throw err;

         res.status(200).send({message: "success", price: result[0].price});
     })
 }

exports.getInventoryProducts = (req, res) => {
    const {username} = req.body;
    console.log(req);

    let whereClause = {user: username};

    var dbo = (db.get()).db(db.getDatabase());
    dbo.collection(db.getProductsCollection()).find(whereClause, {projection: {_id: 0, title: 1, sku: 1, quantity: 1}}).toArray(function(err, result) {
        if(err) throw err;
        res.status(200).send({message: "success", products: result});
    })
}

exports.updateProductQuantity = (req, res) => {
    const {user} = req.body;
    const {newValue} = req.body;
    const {sku} = req.body;

    let whereClause = {user: user, sku: sku};

    let updateQuantity = {
        $set: {
            quantity: parseInt(newValue),
        }
    }

    var dbo = (db.get()).db(db.getDatabase());
    dbo.collection(db.getProductsCollection()).updateOne(whereClause, updateQuantity, function(err, result) {
        if(err) throw err;
        res.status(200).send({message: "success"});
    });
}

//Used to update multiple products' quantities
exports.deduceQuantities = (req, res) => {
    const {products} = req.body;
    const {user} = req.body;

    var dbo = (db.get()).db(db.getDatabase());
    let whereClause;
    let updateClause;

    products.forEach(product => {
        whereClause = {user: user, sku: product.sku}

        updateClause = {
            $set: {
                quantity: (product.quantity - product.orderedQuantity)
            }
        }

        dbo.collection(db.getProductsCollection()).updateOne(whereClause, updateClause, function(err, result) {
            if(err) throw err;
        })
    })
    res.status(200).send({message: "success"})
}

exports.findProductByID = (req, res) => {
    const {user} = req.body;
    const {id} = req.body;

    let whereClause = {user: user, _id: ObjectID(id)}

    var dbo = (db.get()).db(db.getDatabase());
    dbo.collection(db.getProductsCollection()).find(whereClause).toArray(function(err, result) {
        if(err) throw err;
        if(result.length > 0){
            res.status(200).send({message: "success", product: result[0]})
        }
        else{
            res.status(200).send({message: "error"});
        }
    })
}