const express = require('express');
const router = express.Router();
const Blab = require('../models/blab');
const mongoose = require('mongoose');

var array = [];
router.get('/', (req, res, next) => {
    res.status(200).send(array);
});

router.post('/', (req, res, next) => {
    const data = new Blab({
        _id: new mongoose.Types.ObjectId(),
        postTime: Date.now, 
        author:{
            email: req.body.email,
            name: req.body.name
        },
        message: req.body.message
    });   
    result =>{
        res.status(201).json({
            pass: 'Created data entry successfully',
            createdData: {
                id: data.id,
                postTime: data.postTime,
                author: {
                    email: data.email,
                    name: data.name
                },
                message: data.message
            }
        });
        console.log(result);
    }
    console.log("halp");

    array.push(result);
});

router.delete('/:{id}', (req, res) => {
    const id = req.params.id;
    var array1 = array;
    return array.filter(function(value, index, arr){

        return value.id != id;
    
    });
    if(array1 != array){res.status(200);}
    else{res.status(404);}
  });

  module.exports = router;