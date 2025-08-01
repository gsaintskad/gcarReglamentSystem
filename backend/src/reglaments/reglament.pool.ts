// src/gcarDbPool.ts (Correct setup for your local Docker GCAR DB)
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const GCAR_PG_USER = process.env.GCAR_PG_USER;
const GCAR_PG_PASSWORD = process.env.GCAR_PG_PASSWORD;
const GCAR_PG_HOST = process.env.GCAR_PG_HOST; // This should be 'localhost'
const GCAR_PG_PORT = process.env.GCAR_PG_PORT; // This should be '5433'
const GCAR_PG_DB = process.env.GCAR_PG_DB;

if (
  !GCAR_PG_USER ||
  !GCAR_PG_PASSWORD ||
  !GCAR_PG_HOST ||
  !GCAR_PG_PORT ||
  !GCAR_PG_DB
) {
  console.error("Missing one or more required GCAR DB environment variables.");
  process.exit(1);
}

const numericGcarPgPort = parseInt(GCAR_PG_PORT, 10);
if (isNaN(numericGcarPgPort)) {
  console.error(`Invalid GCAR_PG_PORT: ${GCAR_PG_PORT}. It must be a number.`);
  process.exit(1);
}

// Direct connection string, no proxy involved for this local DB
const gcarConnectionString = `postgres://${GCAR_PG_USER}:${GCAR_PG_PASSWORD}@${GCAR_PG_HOST}:${numericGcarPgPort}/${GCAR_PG_DB}`;

export const reglamentPool = new pg.Pool({
  connectionString: gcarConnectionString,
});

reglamentPool.on("connect", (client: pg.PoolClient) => {
  console.log("New client connected to GCAR DB");
});
reglamentPool.on("remove", (client: pg.PoolClient) => {
  console.log("Client removed from GCAR DB pool");
});

// ... (SIGINT, SIGTERM, uncaughtException handlers as before)
// ...
