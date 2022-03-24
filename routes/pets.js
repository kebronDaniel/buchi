const express = require('express');
const { func } = require('joi');
const router = express.Router();
const mongoose = require('mongoose');
const {Pet,validate} = require('../models/pet');

async function getAllPets(req, res) {
    const limit = parseInt(req.query.limit);
    const filter = req.query;
    delete filter.limit;
    const pets = await Pet.find(filter)
        .limit(limit)
        .select('-_id -__v');

    res.send({"status" : "success", "pets" : pets});
}
router.get('', getAllPets);

async function getPet(req, res) {
    const pet =  await Pet.findOne({_id : req.params.id}).select();
    if (!pet) return res.status(404).send("Pet not found");
    res.send(pet);
}
router.get('/:id/:limit', getPet);

async function createPet(req, res){
    
    if (validate(req.body).error) {
        res.send(validate(req.body).error.details[0].message);
        return;
    }

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
}
router.post('', createPet);

async function updatePet(req, res) {

    if (validate(req.body).error) {
        res.send(validate(req.body).error.details[0].message);
        return;
    }

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
}
router.put('/:id', updatePet);


async function deletePet(req, res){
    const pet = await Pet.deleteOne({_id : req.params.id});
    res.send(pet);
}
router.delete('/:id', deletePet);

module.exports = router;