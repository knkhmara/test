'use strict';
const Validator = require('validatorjs');
const knex = require('./../../libs/knex');

// add custom validate rules here

/**
 * Get unique email from users
 */
Validator.registerAsync('unique', (email, attribute, req, passes) => {
  knex('users')
    .where('email', email)
    .first()
    .count('* as c')
    .then(count => {
      passes(!count.c, 'This email has already been taken.');
    })
    .catch(() => {
      passes(false, 'Error in Validator.js:19');
    });
});

/**
 * Get exist user
 */
Validator.registerAsync('user_exist', (user_id, attribute, req, passes) => {
  knex('users')
    .where('id', user_id)
    .first()
    .count('* as c')
    .then(count => {
      passes(count.c === 1, 'User not found');
    })
    .catch(() => {
      passes(false, 'Error in Validator.js:34');
    });
});

/**
 * Get exist email
 */
Validator.registerAsync('email_exist', (email_exist, attribute, req, passes) => {
  knex('users')
    .where('email', email_exist)
    .first()
    .count('* as c')
    .then(count => {
      passes(count.c === 1, 'Email not found');
    })
    .catch(() => {
      passes(false, 'Error in Validator.js:50');
    });
});

/**
 * Get exist skill
 */
Validator.registerAsync('exist_skill', (skill_id_exist, attribute, req, passes) => {
  if (skill_id_exist === null) {
    passes();
  } else {
    knex('skills')
      .where('id', skill_id_exist)
      .first()
      .count('* as c')
      .then(count => passes(count.c === 1, 'Skill not found'))
      .catch(() => passes(false, 'Error in Validator.js:66'));
  }
});

module.exports = Validator;
