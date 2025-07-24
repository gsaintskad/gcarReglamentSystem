import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("reglament_types", (table) => {
    table.increments("id").primary(); // This makes 'id' an auto-incrementing integer and primary key
    table.string("name", 255).notNullable();
    table.text("description").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("reglament_types");
}