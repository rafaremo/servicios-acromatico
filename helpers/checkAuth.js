const Usuario = require('../models/Usuario');

const checkAuth = (req, res, next) => {
  let token = req.header('x-auth');

  Usuario.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject('No user found');
      }
      // res.status(200).json(user);
      req.user = user;
      req.token = token;
      next();
    })
    .catch(e => {
      res.status(401).json({message: e})
    });
}

module.exports = checkAuth;