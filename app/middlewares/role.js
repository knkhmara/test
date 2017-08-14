'use strict';
const _ = require('lodash');

module.exports = roles => (req, res, next) => {
  if (_.findIndex(roles, item => req._user.roles.includes(item)) >= 0) {
    next();
  } else {
    res.status(403).end();
  }
};
