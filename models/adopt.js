const Joi = require('joi');
const mongoose = require('mongoose');
const {Customer} = require('./customer');
const {Pet} = require('./pet');

const Adopt = mongoose.model('Adopt',new mongoose.Schema({
    customer : {
        type : new mongoose.Schema({
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
        }),
        required : true
    },
    pet : {
        type : new mongoose.Schema({
            type : {
                type : String,
                required : true,
                lowercase : true,
                minlength : 2,
                maxlength : 50
            }, 
            gender : {
                type : String,
                required : true,
                lowercase : true,
                minlength : 2,
                maxlength : 6
            },
            age : {
                type : Number,
                required : true,
                min : 0,
            },
            goodWithChildern : {
                type : Boolean,
                required : true,
                default : true
            },
            photo : {
                type : String
            }
        }),
        required : true
    },
    adoption_date : {
        type : Date,
        required : true,
    },

}, { versionKey: false } ));

function validate(adoption){
    const schema = Joi.object({
        customerId: Joi.string()
            .alphanum()
            .required(),
        petId: Joi.string()
            .alphanum()
            .required(),
    })
    return schema.validate(adoption);
}


exports.Adopt = Adopt;
exports.validate = validate;