const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validador = require('validator');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const usuarioSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validador.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  tokens: [{
    access: {
      type: String,
      require: true
    },
    token: {
      type: String,
      require: true
    }
  }],
  nombre: {
    type: String,
    minlength: 3
  },
  apellidos: {
    type: String
  },
  cotizaciones: [{
    type: Schema.Types.ObjectId,
    ref: 'Cotizacion'
  }]
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

usuarioSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return {
    _id: userObject._id,
    email: userObject.email
  };
}

usuarioSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, 'rafaeselsecreto').toString();

  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => {
    return {token, user};
  });
}

usuarioSchema.statics.findByToken = function (token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'rafaeselsecreto');
  } catch (e) {
    // return new Promise((res,rej) => {
    //   rej('auth error');
    // });
    return Promise.reject('Auth Error');
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

usuarioSchema.pre('save', function(next){
  let user = this;

  let modifiedPass = user.isModified('password');
  if (modifiedPass) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

module.exports = mongoose.model('Usuario', usuarioSchema);