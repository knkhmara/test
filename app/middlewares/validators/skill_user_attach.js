'use strict';
const Validator = require('./Validator');
const _ = require('lodash');

module.exports = (req, res, next) => {
  const rules = {
    skill_id: 'required|integer|min:1|exist_skill',
    user_id: 'required|integer|min:1|user_exist',
    value: 'required|in:0,1,2,3,5,8'
  };

  const validate = new Validator(req.body, rules);

  validate.passes(() => {
    req._vars = _.pick(req.body, ['skill_id', 'user_id', 'value']);
    next();
  });
  validate.fails(() => res.status(400).send(validate.errors));
};
