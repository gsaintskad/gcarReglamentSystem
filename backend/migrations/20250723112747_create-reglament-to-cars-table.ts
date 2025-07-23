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
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.uuid("reglament_type_id").notNullable();
    table.uuid("car_id").notNullable();
    table.integer("mileage_stamp").notNullable();
    table.boolean("is_active").notNullable().defaultTo(true);
    table.uuid("auto_park_id").notNullable();
    table.integer("mileage_deadline").notNullable();
    table.integer("mileage_before_deadline_to_remember").notNullable();
    table.integer("created_by_telegram_id").notNullable();
    table.integer("updated_by_telegram_id").notNullable();
    table
      .foreign("reglament_type_id")
      .references("id")
      .inTable("reglament_types");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.string("comment");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cars_to_reglaments");
}
