const express = require('express');
const router = express.Router();
const Blab = require('../models/blab');
const mongoose = require('mongoose');


router.get('/', (req, res, next) => {
    Text.find().select('name text').exec().then(docs => {
        const response = {
            count : docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    text: doc.text,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/textData/' + doc._id
                    }          
                }
            })
        };
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const data = new Blab({
        _id: new mongoose.Types.ObjectId(),
        postTime: Date.now, 
        author:{
            email: req.body.email,
            name: req.body.name
        }
        message: req.body.message
    });
    data.save().then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'Created data entry successfully',
            createdData: {
                id: result.id,
                postTime: result.postTime,
                author: {
                    email: result.email,
                    name: result.name
                },
                message: result.message
            }
        });
    })
    .catch(err => {console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:{id}', function (req, res, next) => {
    const id = req.params.{id};
    Text.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(404).json({
          error: err
        });
      });
  });