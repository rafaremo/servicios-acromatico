const express = require('express');
const router  = express.Router();
const Usuario = require('../../models/Usuario');

//Nuevo Usuario
router.post('/user', (req,res) => {
  const {email, password} = req.body;

  Usuario.create({email, password})
    .then(result => {
      return result.generateAuthToken();
    })
    .then((result)=>{
      res.status(201).header('x-auth', result.token).json(result.user);
    })
    .catch(err => {
      res.status(400).json({error: err});
    });
});

module.exports = router;