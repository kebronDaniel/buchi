const Joi = require('joi');
const express = require('express');
const app = express();
const adopts = require('./routes/adopts');
const customers = require('./routes/customers');
const pets = require('./routes/pets');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/buchi').
    then(() => {console.log("connected to the database")}).
    catch(() => {console.log("couldnot connect to the database")});

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use('/buchi.com/api/adopts', adopts);
app.use('/buchi.com/api/customers', customers);
app.use('/buchi.com/api/pets', pets);

const port = process.env.PORT || 5000;
app.listen(port, ()=>{console.log(`Listening at port ${port}`)});