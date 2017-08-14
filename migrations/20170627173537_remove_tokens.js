exports.up = knex => knex.schema.dropTableIfExists('tokens');
exports.down = knex => {};
