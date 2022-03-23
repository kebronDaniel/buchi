const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Adopt} = require('../models/adopt');
const { Customer } = require('../models/customer');
const { Pet } = require('../models/pet');

router.get('', async(req, res) => {
    const adopts = await Adopt.find().sort('-adoption_date');
    res.send(adopts);
});

router.get('/:id', async(req, res) => {
    const adopt =  await Adopt.findOne({_id : req.params.id}).select();
    if (!adopt) return res.status(404).send("Adopt request not found");
    res.send(adopt);
});

router.post('', async(req, res) => {
    
    // const { error } = validate(req.body);
    // if(error) return res.status(400).send(error.details[0].messages);

    const customer = await Customer.findOne({_id : req.body.customerId});
    if(!customer) return res.status(404).send("Invalid customer Id");

    const pet = await Pet.findOne({_id : req.body.petId});
    if(!pet) return res.status(404).send("invalid pet Id");

    const adopt = new Adopt({
        customer : {
            _id : customer._id,
            name : customer.name,
            phone : customer.phone
        },
        pet : {
            type : pet.type,
            gender : pet.gender,
            age : pet.age,
            goodWithChildren : pet.goodWithChildren,
            photo : pet.photo
        }
    });
    const result = await adopt.save();
    res.send(result);
});


router.put('/:id', async(req, res) => {

    // const { error } = validate(req.body);
    // if(error) return res.status(400).send(error.details[0].messages);

    const customer = await Customer.findOne({_id : req.body.customerId});
    if(!customer) return res.status(404).send("Invalid customer Id");

    const pet = await Pet.findOne({_id : req.body.petId});
    if(!pet) return res.status(404).send("invalid pet Id");

    const adopt =  await Adopt.update({_id : req.params.id}, {
        $set : {
            customer : {
                _id : customer._id,
                name : customer.name,
                phone : customer.phone
            },
            pet : {
                type : pet.type,
                gender : pet.gender,
                age : pet.age,
                goodWithChildren : pet.goodWithChildren,
                photo : pet.photo
            }
        }
    });
    res.send(adopt);
});

router.delete('/:id', async(req, res) => {
    const adopt = await Adopt.deleteOne({_id : req.params.id});
    res.send(adopt);
});

module.exports = router;