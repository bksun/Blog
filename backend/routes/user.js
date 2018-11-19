const express = require('express');
const User = require('../model/user.model');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res, next) => {
  console.log('sign in api called');
  User.findOne({email: req.body.email})
  .then(user => {
    if(!user){
      return res.status(401).json({
        message: 'Auth Failed'
      })
    }
    const token = jwt.sign({email: user.email, userId: user._id}, 'secretthisshouldbelonger', {expiresIn: "1h"});
    console.log('token:',token);
    res.status(200).json({
      token: token
    })
  })
  .catch(err => {
    return res.status(401).json({
      message: 'Auth Failed'
    })
  })
})


router.post('/signup', (req, res, next) => {
  console.log('sign up api called');


    const user = new User({
      email: req.body.email,
      password: req.body.password
    });

    console.log(req.body.email);
    console.log(req.body.password);

  user.save().then( result => {
    res.status(201).json({
      message: 'user created',
      result: result
    })
  })
  .catch( err => {
    res.status(500).json({
      error: err
    })
  })
});

module.exports = router;
