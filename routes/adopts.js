const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Adopt,validate} = require('../models/adopt');
const { Customer } = require('../models/customer');
const { Pet } = require('../models/pet');

async function getAllAdopts(req, res) {

    
    if (req.query.from_date && req.query.to_date) {
        const allPets = await Adopt.find({ adoption_date : 
                { $gte: req.query.from_date+"T21:00:00.000+00:00", $lte: req.query.to_date+"T21:00:00.000+00:00" }
        }).select('-adoption_date, -_id');
        res.status(200).send({"status" : "success", "data" : allPets});
    }
    else {
        const pets = await Adopt.find().select('-adoption_date, -_id');
        if (pets.length === 0) {
            res.status(404).send("There are no Adoption records.")
        }
        res.status(200).send({"status" : "success", "data" : pets})
    }

}
router.get('', getAllAdopts);


async function getAnAdopt(req, res){
    const adopt =  await Adopt.findOne({_id : req.params.id}).select('-_id');
    if (!adopt) return res.status(404).send("Adopt request not found");
    res.send(adopt);
}
router.get('/:id', getAnAdopt);


async function createAdopt(req, res) {

    if (validate(req.body).error) {
        res.send(validate(req.body).error.details[0].message);
        return;
    }

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
}
router.post('', createAdopt);

async function updateAdopt(req, res) {

    const getRecord = await Adopt.findOne({_id: req.params.id});
    if (getRecord) {

        if (validate(req.body).error) {
            res.send(validate(req.body).error.details[0].message);
            return;
        }

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
        const updatedRecord = await Adopt.findOne({_id : req.params.id});
        res.send(updatedRecord);
    }
    res.status(404).send("The record you are looking for is not found!");
}
router.put('/:id', updateAdopt);

async function deleteAdopt(req, res) {
    const getRecord = await Adopt.findOne({_id: req.params.id});
    if (getRecord) {
        const adopt = await Adopt.deleteOne({_id : req.params.id});
        res.send(adopt);
    }
    res.status(404).send("The record you are looking is not found!");
}
router.delete('/:id', deleteAdopt);

module.exports = router;