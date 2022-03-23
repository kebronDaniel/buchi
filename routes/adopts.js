const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Adopt} = require('../models/adopt');
const { Customer } = require('../models/customer');
const { Pet } = require('../models/pet');

router.get('', async(req, res) => {
    // const from_date = req.query.from_date+"T21:00:00.000+00:00";
    // const to_date = req.query.to_date+"T21:00:00.000+00:00";
    const adopts = await Adopt
        .find({adoption_date : 
            { $gte: req.query.from_date+"T21:00:00.000+00:00", $lte: req.query.to_date+"T21:00:00.000+00:00" }})
            .select('-adoption_date, -_id, ');
    if (adopts.length > 0) {
        res.send({"status" : "success", "data" : adopts});
    }
    else res.send("No pets found in the date you are looking for");
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

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

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
        },

        adoption_date : date

    });
    const result = await adopt.save();
    res.send({"status" : "success", "adoption_id" : result._id});
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