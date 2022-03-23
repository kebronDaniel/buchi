const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Pet} = require('../models/pet');

router.get('', async(req, res) => {
    const limit = parseInt(req.query.limit);
    const filter = req.query;
    delete filter.limit;
    const pets = await Pet.find(filter)
        .limit(limit)
        .select('-_id -__v');

    res.send({"status" : "success", "pets" : pets});
});


router.get('/:id/:limit', async(req, res) => {
    const pet =  await Pet.findOne({_id : req.params.id}).select();
    if (!pet) return res.status(404).send("Pet not found");
    res.send(pet);
});

router.post('', async(req, res) => {
    
    // const { error } = validate(req.body);
    // if(error) return res.status(400).send(error.details[0].messages);

    const pet = new Pet({
        type : req.body.type,
        gender : req.body.gender,
        age : req.body.age,
        goodWithChildren : req.body.goodWithChildren,
        photo : [req.body.photo],
    });
    const result = await pet.save();
    if (result) {
        res.send({"status" : "success", "pet_id" : pet._id});
    }
    else res.status(500).send("Something went wrong while saving the new pet, please try again");
});

router.put('/:id', async(req, res) => {

    // const { error } = validate(req.body);
    // if(error) return res.status(400).send(error.details[0].messages);

    const pet =  await Pet.update({_id : req.params.id}, {
        $set : {
            type : req.body.type,
            gender : req.body.gender,
            age : req.body.age,
            goodWithChildren : req.body.goodWithChildren,
            photo : [req.body.photo],
        }
    });
    res.send({"status" : "success", "pet_id" : pet._id});
});

router.delete('/:id', async(req, res) => {
    const pet = await Pet.deleteOne({_id : req.params.id});
    res.send(pet);
});

module.exports = router;