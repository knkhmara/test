'use strict';
const express = require('express');
const router = express.Router();
const env = require('./../config');

router.get('/', (req, res) => {
  res.json({
    type_works: env.type_works,
    task_status: env.task_status,
    positions: env.positions,
    roles: env.roles
  });
});

module.exports = router;
