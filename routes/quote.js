const router = require("express").Router();
const quote = require("../models/quote");
const { verifyToken } = require("../validation");
//CRUD operations

// Create quote - post 
router.post("/", verifyToken, (req, res) =>{
    data = req.body;
    quote.insertMany(data)
    .then(data => {res.send(data);})
    .catch(err => {res.status(500).send({message:err.message});})
});

//Read all quotes - get
router.get("/",(req, res) =>{
    quote.find()
    .then(data => {res.send(data);})
    .catch(err => {res.status(500).send({message:err.message});})
});

//Read all quotes that are in stock
router.get("/is-active",verifyToken,(req, res) =>{
    quote.find({ isActive:true })
    .then(data => {res.send(data);})
    .catch(err => {res.status(500).send({message:err.message});})
});

//Read specific quote - get by id
router.get("/:id",(req, res) =>{
    quote.findById(req.params.id)
    .then(data => {res.send(data);})
    .catch(err => {res.status(500).send({message:err.message});})
});

//Update specific quote - put
router.put("/:id",verifyToken, (req, res) =>{
    const id = req.params.id
    quote.findByIdAndUpdate(id, req.body)
    .then(data => {
        if(!data)
        {
            res.status(404).send(
                { message:"Cannot update quote with id="+id+". Maybe quote was not found :(" }
            )
        }
        else 
        {
            res.send(
                {message:"quote succesfully updated"}
            )
        }
    })
    .catch(err => {res.status(500).send(
        {message:"Error updating quote with id="+id});
    })
});  


//Delete specific product - delete
router.delete("/:id",verifyToken, (req, res) =>{
    const id = req.params.id
    quote.findByIdAndDelete(id)
    .then(data => {
        if(!data)
        {
            res.status(404).send(
                { message:"Cannot delete quote with id="+id+". Maybe quote was not found :(" }
            )
        }
        else 
        {
            res.send(
                {message:"Quote succesfully deleted"}
            )
        }
    })
    .catch(err => {res.status(500).send(
        {message:"Error deleting quote with id="+id});
    })
});  

module.exports = router;