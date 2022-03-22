const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Pet} = require('../models/pet');

router.get('', async(req, res) => {
    const pets = await Pet.find().select();
    res.send(pets);
});

router.get('/:id', async(req, res) => {
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
        photo : req.body.photo,
    });
    const result = await pet.save();
    res.send(result);
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
            photo : req.body.photo,
        }
    });
    console.log(pet);
    res.send(pet);
});

router.delete('/:id', async(req, res) => {
    const pet = await Pet.deleteOne({_id : req.params.id});
    res.send(pet);
});

module.exports = router;