const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 4,
        maxlength : 50
    },
    phone : {
        type : Number,
        required : true,
        min : 10,
    },
}, { versionKey: false }));

// function validateInput(customer){
//     const schema = {
//         name : Joi.string().min(4).max(50).required(),
//         phone : Joi.string().min(10).max(15).required(),
//     };
//     return Joi.validate(customer, schema);
// }

exports.Customer = Customer;
// exports.validate = validateInput;