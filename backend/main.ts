import { startServer } from "./src/api/api.js";
import { getAllCars } from "./src/myTaxi/myTaxi.utils.js";
import { openMyTaxiSShTunnel } from "./src/myTaxi/myTaxi.ssh.js";

await openMyTaxiSShTunnel;

startServer();
