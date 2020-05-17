const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Patient } = require('../models/patient');

// => localhost:3000/patients/
router.get('/', (req, res) => {
    Patient.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Patients :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Patient.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Patient :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var pat = new Patient({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        symptoms: req.body.symptoms,
        contact: req.body.contact,
        email: req.body.email,
    });
    pat.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Patient Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var pat = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        symptoms: req.body.symptoms,
        contact: req.body.contact,
        email: req.body.email,
    };
    Patient.findByIdAndUpdate(req.params.id, { $set: pat }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Patient Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Patient.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Patient Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;