const Joi = require('joi');
const mongoose = require('mongoose');

const Pet = mongoose.model('Pet', new mongoose.Schema({
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
}));

// function validateInput(pet){
//     const schema = {
//         type : Joi.string().min(2).max(50).required(),
//         gender : Joi.string().min(2).max(5).required(),
//         age : Joi.number().min(0).max(50).required(),
//         gender : Joi.string().min(2).max(5).required(),
//         photo : Joi.string().required()
//     };
//     return Joi.validate(pet, schema);
// }

exports.Pet = Pet;
// exports.validate = validateInput;