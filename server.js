const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

//import product routes
const productRoutes = require("./routes/product")

require("dotenv-flow").config();

//parse request content type JSON
app.use(bodyParser.json());

//connect to mongoDB
mongoose.connect (
    process.env.DBHOST,  { useUnifiedTopology: true, useNewUrlParser: true }
  ).catch(error => console.log("Error connecting to MongoDB: " + error));

mongoose.connection.once('open', () => console.log('Connected succesfully to MongoDB'));

//post, put, delete -> CRUD
app.get("/api/welcome", (req, res)=>{
    res.status(200).send({message:"Welcome tot the MEN RESTful API"})
});

app.use("/api/products", productRoutes)


//defining port
const PORT = process.env.PORT || 4000;

app.listen(PORT, function(){
    console.log("Server is runsadning on port:" + PORT);
})

module.exports = app;