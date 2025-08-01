import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // We'll add this to ensure the uuid-ossp extension exists if it's not already
  // created by a previous migration. This is a good practice for migrations
  // that use UUIDs.
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return knex.schema.createTable('cars', (table) => {
    // Primary key 'car_id'
    table.uuid('car_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    // Data columns
    table.bigInteger('actual_mileage');
    table.timestamp('last_actualization', { useTz: true });
    table.string('license_plate');

    // Foreign key 'auto_park_id'
    table.uuid('auto_park_id').notNullable().references('id').inTable('auto_parks');

    // Timestamps
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('cars');
}
