import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('cars_to_reglaments', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('reglament_type_id').notNullable();
    table.uuid('car_id').notNullable();
    table.integer('mileage_stamp').notNullable();
    table.boolean('is_active').notNullable().defaultTo(true);
    table.uuid('auto_park_id').notNullable();
    table.integer('mileage_deadline').notNullable();
    table.integer('remember_after_mileage_past').notNullable();
    table.foreign('reglament_type_id').references('id').inTable('reglament_types').onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('cars_to_reglaments');
}