const express = require('express');
const router  = express.Router();
const Producto = require('../../models/Producto');

//Get all Productos
router.get('/', (req,res) => {
  Producto.find({})
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json({error: err});
    });
});

//Add new producto
router.post('/', (req, res) => {
  Producto.create(req.body)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(400).json({error: err});
    });
});

//Update producto
router.put('/:id', (req,res) => {
  Producto.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(result => {
      res.status(202).json(result);
    })
    .catch(err => {
      res.status(400).json({error: err});
    });
});

router.delete('/:id', (req,res) => {
  Producto.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json({error: err});
    });
})

module.exports = router;