// For cars_to_reglaments table
import { Knex } from "knex";

/*DTO

reglament_type_id
car_id
auto_park_id
mileage_deadline
milleage_before_deadline_to_remember
*/

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars_to_reglaments", (table) => {
    // Make 'id' an auto-incrementing integer and primary key
    table.increments("id").primary();

    // Change 'reglament_type_id' to an integer to match 'reglament_types.id'
    // Ensure this column type matches the primary key type of 'reglament_types' table
    table.integer("reglament_type_id").unsigned().notNullable(); // .unsigned() is good practice for foreign keys referencing auto-incrementing IDs

    table.uuid("car_id").notNullable(); // Assuming car_id is still a UUID for now
    table.integer("mileage_stamp").notNullable();
    table.boolean("is_active").notNullable().defaultTo(true);
    table.uuid("auto_park_id").notNullable(); // Assuming auto_park_id is still a UUID for now
    table.integer("mileage_deadline").notNullable();
    table.integer("mileage_before_deadline_to_remember").notNullable();
    table.integer("created_by_telegram_id").notNullable();
    table.integer("updated_by_telegram_id").notNullable();

    // Define the foreign key relationship
    table
      .foreign("reglament_type_id")
      .references("id")
      .inTable("reglament_types")
      .onDelete("CASCADE"); // Added onDelete for better referential integrity (optional, but recommended)

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.string("comment");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cars_to_reglaments");
}