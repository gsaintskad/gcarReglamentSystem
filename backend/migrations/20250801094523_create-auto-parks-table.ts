import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // This command creates the uuid-ossp extension if it doesn't already exist.
  // The uuid_generate_v4() function used below requires this extension.
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return knex.schema.createTable("auto_parks", (table) => {
    // Primary key and ID
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

    // Foreign keys and other IDs
    table.uuid("company_id").notNullable().index();
    table.uuid("currency_id").notNullable().index();

    // Data columns
    table.text("name");
    table.text("timezone");
    table.string("country_code", 2);
    table.text("code");

    // Timestamps with time zone
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("auto_parks");
}
