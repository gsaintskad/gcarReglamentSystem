import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  return knex.schema.createTable('reglament_types', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')); 
    table.string('name', 255).notNullable(); 
    table.text('description').nullable(); 
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('reglament_types');
}