import type { Knex } from "knex";
import { getAllAutoParks } from "../src/myTaxi/myTaxi.queries.js";
import { openMyTaxiSShTunnel } from "../src/myTaxi/myTaxi.ssh.js";

export async function up(knex: Knex): Promise<void> {
  await openMyTaxiSShTunnel;
  const { rows: aps } = await getAllAutoParks();

  return knex("auto_parks").insert(aps);
}

export async function down(knex: Knex): Promise<void> {
  return knex.delete().from("auto_parks");
}
