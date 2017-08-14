const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);

exports.up = knex => {
  return knex.table('users').insert([
    {
      email: 'owner@mail.com',
      first_name: 'Owner',
      last_name: 'Owner',
      password: bcrypt.hashSync('password', salt),
      position: 'default',
      roles: 'owner',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      email: 'pm@mail.com',
      first_name: 'Pm',
      last_name: 'Pm',
      password: bcrypt.hashSync('password', salt),
      position: 'default',
      roles: 'pm',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      email: 'member@mail.com',
      first_name: 'Member',
      last_name: 'Member',
      password: bcrypt.hashSync('password', salt),
      position: 'nodejs',
      roles: 'member',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
};

exports.down = knex => {};
