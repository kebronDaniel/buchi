const express = require('express');
const { func } = require('joi');
const router = express.Router();
const mongoose = require('mongoose');
const {Customer,validate} = require('../models/customer');


async function getAllCustomers(req, res) {
    const customers = await Customer.find(req.query).select({name : 1, _id : -1});
    res.send(customers);
}
router.get('', getAllCustomers);


async function getCustomer(req, res) {
    const customer =  await Customer.findOne({_id : req.params.id}).select();
    if (!customer) return res.status(404).send("Customer not found");
    res.send(customer);
}
router.get('/:id',getCustomer);

async function createCustomer(req, res){
    
    if (validate(req.body).error) {
       res.send(validate(req.body).error.details[0].message);
       return;
    }

    const customer = new Customer({
        name : req.body.name,
        phone : req.body.phone,
    });
    const result = await customer.save();
    res.send({"status": "success", "customer_id" : result._id});
}
router.post('', createCustomer);

async function updateCustomer(req, res) {

    if (validate(req.body).error) {
        res.send(validate(req.body).error.details[0].message);
        return;
    }

    const customer =  await Customer.update({_id : req.params.id}, {
        $set : {
            name : req.body.name,
            phone : req.body.phone,
        }
    });
    console.log(customer);
    res.send(customer);
}
router.put('/:id', updateCustomer);

async function deleteCustomer(req, res) {
    const customer = await Customer.deleteOne({_id : req.params.id});
    res.send(customer);
}
router.delete('/:id', deleteCustomer);

module.exports = router;