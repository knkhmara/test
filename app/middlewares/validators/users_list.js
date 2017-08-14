'use strict';
const Validator = require('./Validator');
const env = require('./../../config');

module.exports = (req, res, next) => {
  const rules = {
    username: 'string|min:3',
    position: 'string|in:' + env.positions.join(','),
    role: 'string|in:' + env.roles.join(',')
  };

  const validate = new Validator(req.query, rules);
  if (validate.fails()) {
    res.status(400).send(validate.errors);
  } else {
    next();
  }
};
