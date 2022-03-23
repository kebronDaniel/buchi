const Joi = require('joi');
const express = require('express');
const app = express();
const adopts = require('./routes/adopts');
const customers = require('./routes/customers');
const pets = require('./routes/pets');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
mongoose.connect(process.env.DB_connection_string).
    then(() => {console.log("connected to the database")}).
    catch(() => {console.log("couldnot connect to the database")});

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use('/buchi.com/api/adopts', adopts);
app.use('/buchi.com/api/customers', customers);
app.use('/buchi.com/api/pets', pets);

const port = process.env.PORT ;
app.listen(port, ()=>{console.log(`Listening at port ${port}`)});