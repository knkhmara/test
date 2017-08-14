exports.up = knex => {
  return knex.schema.createTable('tokens', table => {
    table.increments();
    table.integer('user_id', 10).unsigned();
    table.string('token', 32).comment('For Authorization from frontend');
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.index(['user_id', 'token']);
    table.collate('utf8_general_ci');
  });
};

exports.down = knex => knex.schema.dropTableIfExists('tokens');
