const Joi = require('joi');
const express = require('express');
const app = express();
const adopts = require('./routes/adopts');
const customers = require('./routes/customers');
const pets = require('./routes/pets');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const morgan = require('morgan');

dotenv.config();

// Here you can add your mongoDB connection string like : (mongodb://localhost/anyname)
mongoose.connect(process.env.DB_connection_string).
    then(() => {console.log("connected to the database")}).
    catch(() => {console.log("couldnot connect to the database")});

app.use(bodyParser.json({limit : '50mb'}));
app.use(bodyParser.urlencoded({extended : true, limit : '50mb', parameterLimit : 50000}));
app.use(express.static('public'));
app.use(morgan("dev"));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
});

app.use('/buchi.com/api/adopts', adopts);
app.use('/buchi.com/api/customers', customers);
app.use('/buchi.com/api/pets', pets);

// const port = process.env.PORT ;
// app.listen(port, ()=>{console.log(`Listening at port ${port}`)});


exports.app = app;