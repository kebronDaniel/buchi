const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Customer} = require('../models/customer');

router.get('', async(req, res) => {
    const customers = await Customer.find(req.query).select({name : 1, _id : -1});
    res.send(customers);
});

router.get('/:id', async(req, res) => {
    const customer =  await Customer.findOne({_id : req.params.id}).select();
    if (!customer) return res.status(404).send("Customer not found");
    res.send(customer);
});

router.post('', async(req, res) => {
    
    // const { error } = validate(req.body);
    // if(error) return res.status(400).send(error.details[0].messages);

    const customer = new Customer({
        name : req.body.name,
        phone : req.body.phone,
    });
    const result = await customer.save();
    res.send({"status": "success", "customer_id" : result._id});
});

router.put('/:id', async(req, res) => {

    // const { error } = validate(req.body);
    // if(error) return res.status(400).send(error.details[0].messages);

    const customer =  await Customer.update({_id : req.params.id}, {
        $set : {
            name : req.body.name,
            phone : req.body.phone,
        }
    });
    console.log(customer);
    res.send(customer);
});

router.delete('/:id', async(req, res) => {
    const customer = await Customer.deleteOne({_id : req.params.id});
    res.send(customer);
});

module.exports = router;