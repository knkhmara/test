'use strict';
const Validator = require('./Validator');

module.exports = (req, res, next) => {
  const rules = {
    q: 'required|string|min:2'
  };
  const validate = new Validator(req.query, rules);
  if (validate.fails()) {
    res.status(400).send(validate.errors);
  } else {
    next();
  }
};
