const router = require("express").Router();

const product = require("../models/product");

//CRUD operations

// /api/products/
// Create product - post 
router.post("/",(req, res) =>{
    
    data = req.body;

    product.insertMany(data)
    .then(data => {res.send(data);})
    .catch(err => {res.status(500).send({message:err.message});})
});

//Read specific product - get

//Update specific product - put

//Delete specific product - delete

module.exports = router;