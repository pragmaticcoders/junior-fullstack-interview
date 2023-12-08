import { Knex } from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.withSchema('app').createTable('skills', (table) => {
    table.increments("skillId");
    table.string("name").notNullable();
    table.integer("rate").notNullable();
    table.timestamp('updatedAt').nullable().defaultTo(knex.fn.now());
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.withSchema('app').dropTable('skills');
};
