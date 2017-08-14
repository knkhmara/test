'use strict';
const Validator = require('validatorjs');
const knex = require('./../../libs/knex');

function leapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function isValidDate(inDate) {
  let valid = true;

  // reformat if supplied as mm.dd.yyyy (period delimiter)
  if (typeof inDate === 'string') {
    let pos = inDate.indexOf('.');
    if (pos > 0 && pos <= 6) {
      inDate = inDate.replace(/\./g, '-');
    }
  }
  let splited_date = inDate.split('-');
  let yr = parseInt(splited_date[0]);
  let mo = parseInt(splited_date[1]);
  let day = parseInt(splited_date[2]);

  let daysInMonth = [31, leapYear(yr) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (yr < 1000) {
    return false;
  }
  if (isNaN(mo)) {
    return false;
  }
  if (mo > 12 || mo < 1) {
    return false;
  }
  if (isNaN(day)) {
    return false;
  }
  if (day > daysInMonth[mo - 1]) {
    return false;
  }

  return valid;
}

// add custom validate rules here

Validator.register(
  'my_date',
  (value, requirement, attribute) => {
    return isValidDate(value);
  },
  'The :attribute is not a valid date format'
);

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
