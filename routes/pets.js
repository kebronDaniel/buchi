const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Pet,validate} = require('../models/pet');
const multer = require('multer');
const { path } = require('express/lib/application');
const { MulterError } = require('multer');



async function getAllPets(req, res) {
    const limit = parseInt(req.query.limit);
    const filter = req.query;
    delete filter.limit;
    const pets = await Pet.find(filter)
        .limit(limit)
        .select('-_id -__v');
    if(pets.length === 0) {
        res.send("No pets are found");
        return;
    }
    else {
        res.send({"status" : "success", "pets" : pets});
    }
}
router.get('', getAllPets);

async function getPet(req, res) {
    const pet =  await Pet.findOne({_id : req.params.id}).select();
    if (!pet) return res.status(404).send("Pet not found");
    res.send(pet);
}
router.get('/:id', getPet);

// This part is for storage management for image uploading 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
});

// this one filters the files to be image formats
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
};

//This one checks for the file size before uploading
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


async function createPet(req, res){
    
    if (validate(req.body).error) {
        res.send(validate(req.body).error.details[0].message);
        return;
    }

    const files = req.files;
    const photoUrls = [];
    for (const file of files) {
        photoUrls.push(`localhost:5000/${file.path}`);
    }
    const pet = new Pet({
        type : req.body.type,
        gender : req.body.gender,
        age : req.body.age,
        goodWithChildren : req.body.goodWithChildren,
        photo : photoUrls
    });
    const result = await pet.save();
    if (result) {
        res.status(200).send({"status" : "success", "pet_id" : pet._id});
    }
    else res.status(500).send("Something went wrong while saving the new pet, please try again");
}
router.post('',upload.array('Images'),createPet);

async function updatePet(req, res) {

    const getpet = await Pet.findOne({_id: req.params.id});
    if (getpet) {

        if (validate(req.body).error) {
            res.send(validate(req.body).error.details[0].message);
            return;
        }

        const files = req.files;
        const photoUrls = [];
        for (const file of files) {
            photoUrls.push(`localhost:5000/${file.path}`);
        }

        const pet =  await Pet.update({_id : req.params.id}, {
            $set : {
                type : req.body.type,
                gender : req.body.gender,
                age : req.body.age,
                goodWithChildren : req.body.goodWithChildren,
                photo : photoUrls
            }
        });
        const updatedPet =  await Pet.findOne({_id : req.params.id}).select();
        res.send({"status" : "success", "pet" : updatedPet});
    }
    res.status(404).send("There pet you are looking for is not found!");
}
router.put('/:id',upload.array('Images'),updatePet);


async function deletePet(req, res){
    const pet =  await Pet.findOne({_id : req.params.id}).select();
    if (pet) {
        pet = await Pet.deleteOne({_id : req.params.id});
        res.send({"status":"success", "message" : "you have successfully deleted the customer."});
    }
    res.status(404).send("Pet not found!");
}
router.delete('/:id', deletePet);


module.exports = router;