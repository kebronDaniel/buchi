const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 2,
        maxlength : 30
    },
    phone : {
        type : Number,
        required : true,
        min : 10,
    },
}, { versionKey: false }));

function validate(customer){
    const schema = Joi.object({
        name: Joi.string()
            .min(2)
            .max(30)
            .required(),
        phone : Joi.number()
                .min(10)
                .required()
    })
    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validate;