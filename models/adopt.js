const mongoose = require('mongoose');
const customer = require('./customer');
const pet = require('./pet');

const Adopt = mongoose.model('Adopt',new mongoose.Schema({
    customer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'customer',
        required : true
    },
    pet : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'pet',
        required : true
    },
    adoption_date : {
        type : Date,
        required : true,
        default : Date.now
    }
}));

// function validateInput(customer){
//     const schema = {
//         name : Joi.string().min(4).max(50).required(),
//         phone : Joi.string().min(10).max(15).required(),
//     };
//     return Joi.validate(customer, schema);
// }

exports.Adopt = Adopt;
// exports.validate = validateInput;