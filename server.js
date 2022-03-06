const express = require("express");
const mongoose = require("mongoose");
const app = express();

const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");

//setrup swagger
const swaggerDefinition = yaml.load("./swagger.yaml");
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

//import product routes
const authRoutes = require("./routes/auth")
const quoteRoutes = require("./routes/quote")

require("dotenv-flow").config();

//parse request content type JSON
app.use(express.json());

//connect to mongoDB
mongoose.connect (
    process.env.DBHOST,  { useUnifiedTopology: true, useNewUrlParser: true }
  ).catch(error => console.log("Error connecting to MongoDB: " + error));

mongoose.connection.once('open', () => console.log('Connected succesfully to MongoDB'));

//post, put, delete -> CRUD
app.get("/api/welcome", (req, res)=>{
    res.status(200).send({message:"Welcome tot the MEN RESTful API"})
});

app.use("/api/user", authRoutes);
app.use("/api/quotes", quoteRoutes);

//defining port
const PORT = process.env.PORT || 4000;

app.listen(PORT, function(){
    console.log("Server is runsadning on port:" + PORT);
});

module.exports = app;