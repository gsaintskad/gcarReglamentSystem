import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

interface PoolState {
  total: number;
  idle: number;
  waiting: number;
}

const PG_USER = process.env.PG_USER;
const PG_PASSWORD = process.env.PG_PASSWORD;
const PROXY_HOST = process.env.PROXY_HOST;
const PROXY_PORT = process.env.PROXY_PORT;
const PG_DB = process.env.PG_DB;
const ENV = process.env.ENV;

if (!PG_USER || !PG_PASSWORD || !PROXY_HOST || !PROXY_PORT || !PG_DB) {
  console.error(
    "Missing one or more required PostgreSQL environment variables."
  );
  console.error(
    "Please ensure PG_USER, PG_PASSWORD, PROXY_HOST, PROXY_PORT, and PG_DB are set."
  );
  process.exit(1);
}

let connectionString: string;
const numericProxyPort = parseInt(PROXY_PORT, 10);

if (isNaN(numericProxyPort)) {
  console.error(`Invalid PROXY_PORT: ${PROXY_PORT}. It must be a number.`);
  process.exit(1);
}

if (ENV === "TEST" || ENV === "DEV") {
  const encodedPassword = encodeURIComponent(PG_PASSWORD);
  connectionString = `postgres://${PG_USER}:${encodedPassword}@${PROXY_HOST}:${numericProxyPort}/${PG_DB}`;
} else {
  connectionString = `postgres://${PG_USER}:${PG_PASSWORD}@${PROXY_HOST}:${numericProxyPort}/${PG_DB}`;
}

export const pool = new pg.Pool({
  connectionString: connectionString,
});

// FIX: Change pg.Client to pg.PoolClient here
pool.on("connect", (client: pg.PoolClient) => {
  console.log("New client connected to PostgreSQL");
});

// FIX: Change pg.Client to pg.PoolClient here
pool.on("remove", (client: pg.PoolClient) => {
  console.log("Client removed from PostgreSQL pool");
});

process.on("SIGINT", async () => {
  console.log("Received SIGINT. Closing PostgreSQL pool...");
  try {
    await pool.end();
    console.log("PostgreSQL pool closed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Error closing PostgreSQL pool on SIGINT:", err);
    process.exit(1);
  }
});

process.on("SIGTERM", async () => {
  console.log("Received SIGTERM. Closing PostgreSQL pool...");
  try {
    await pool.end();
    console.log("PostgreSQL pool closed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Error closing PostgreSQL pool on SIGTERM:", err);
    process.exit(1);
  }
});

process.on("uncaughtException", async (error: Error) => {
  console.error("Uncaught Exception:", error.message, error.stack);
  console.log(
    "Attempting to close PostgreSQL pool due to uncaught exception..."
  );
  try {
    await pool.end();
    console.log(
      "PostgreSQL pool closed successfully after uncaught exception."
    );
    process.exit(1);
  } catch (err) {
    console.error(
      "Error closing PostgreSQL pool after uncaught exception:",
      err
    );
    process.exit(1);
  }
});

function getPoolState(): void {
  console.log("PostgreSQL Pool State:");
  const state: PoolState = {
    total: pool.totalCount,
    idle: pool.idleCount,
    waiting: pool.waitingCount,
  };
  console.log(state);
}

if (ENV === "TEST") {
  getPoolState();
}
