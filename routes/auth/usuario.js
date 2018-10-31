const express = require('express');
const router  = express.Router();
const checkAuth = require('../../helpers/checkAuth');

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

//get user
router.get('/user', checkAuth, (req,res) => {
  let {user, token} = req;
  res.status(200).json(user);
});

module.exports = router;