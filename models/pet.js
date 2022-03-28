const Joi = require('joi');
const mongoose = require('mongoose');

const Pet = mongoose.model('Pet', new mongoose.Schema({
    type : {
        type : String,
        required : true,
        lowercase : true,
        minlength : 2,
        maxlength : 30
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
    goodWithChildren : {
        type : Boolean,
        required : true,
        default : true
    },
    photo : {
        type : [String]
    }
}, { versionKey: false }));

function validate(pet){
    const schema = Joi.object({
        type: Joi.string()
            .min(2)
            .max(30)
            .required(),
        gender: Joi.string()
            .min(2)
            .max(6)
            .required(),
        age : Joi.number()
                .min(0)
                .required(),
        // goodWithChildern : Joi.boolean().required()
    })
    return schema.validate(pet);
}

exports.Pet = Pet;
exports.validate = validate;