// knexfile.ts
import type { Knex } from "knex";
import dotenv from "dotenv";
import path from "path"; // Import the 'path' module
import { fileURLToPath } from "url"; // Import for __filename/__dirname in ESM

dotenv.config();

// Reconstruct __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: process.env.GCAR_PG_HOST,
      port: parseInt(process.env.GCAR_PG_PORT || "5433", 10),
      user: process.env.GCAR_PG_USER,
      password: process.env.GCAR_PG_PASSWORD,
      database: process.env.GCAR_PG_DB,
    },
    migrations: {
      tableName: "knex_migrations",
      // Use path.resolve to get an absolute path to the migrations directory
      directory: path.resolve(__dirname, "migrations"),
      extension: "ts",
    },
    seeds: {
      // Use path.resolve for seeds directory as well
      directory: path.resolve(__dirname, "seeds"),
      extension: "ts",
    },
  },

  // You can define other environments like 'staging' or 'production' here
};

export default config;
