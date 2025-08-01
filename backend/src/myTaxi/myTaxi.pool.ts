import pg from "pg";
import dotenv from "dotenv";
import { devLog } from "../shared/dev.utils.js";
import PG from "pg";

dotenv.config();

interface PoolState {
  total: number;
  idle: number;
  waiting: number;
}
const PG_USER = process.env.MY_TAXI_PG_USER;
const PG_PASSWORD = process.env.MY_TAXI_PG_PASSWORD;
const PROXY_HOST = process.env.MY_TAXI_PROXY_HOST;
const PROXY_PORT = process.env.MY_TAXI_PROXY_PORT;
const PG_DB = process.env.MY_TAXI_PG_DB;
const ENV = process.env.ENV;
devLog({ PG_USER, PG_PASSWORD, PROXY_HOST, PROXY_PORT, PG_DB, ENV });

if (!PG_USER || !PG_PASSWORD || !PROXY_HOST || !PROXY_PORT || !PG_DB) {
  console.error(
    "Missing one or more required PostgreSQL environment variables.",
  );
  console.error(
    "Please ensure PG_USER, PG_PASSWORD, PROXY_HOST, PROXY_PORT, and PG_DB are set.",
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

export const myTaxiPool = new pg.Pool({
  connectionString: connectionString,
});

// FIX: Change pg.Client to pg.PoolClient here
myTaxiPool.on("connect", (client: pg.PoolClient) => {
  console.log("New client connected to PostgreSQL");
});

// FIX: Change pg.Client to pg.PoolClient here
myTaxiPool.on("remove", (client: pg.PoolClient) => {
  console.log("Client removed from PostgreSQL pool");
});

process.on("SIGINT", async () => {
  console.log("Received SIGINT. Closing PostgreSQL pool...");
  try {
    await myTaxiPool.end();
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
    await myTaxiPool.end();
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
    "Attempting to close PostgreSQL pool due to uncaught exception...",
  );
  try {
    await myTaxiPool.end();
    console.log(
      "PostgreSQL pool closed successfully after uncaught exception.",
    );
    process.exit(1);
  } catch (err) {
    console.error(
      "Error closing PostgreSQL pool after uncaught exception:",
      err,
    );
    process.exit(1);
  }
});

function getPoolState(): void {
  console.log("PostgreSQL Pool State:");
  const state: PoolState = {
    total: myTaxiPool.totalCount,
    idle: myTaxiPool.idleCount,
    waiting: myTaxiPool.waitingCount,
  };
  console.log(state);
}

if (ENV === "TEST") {
  getPoolState();
}
