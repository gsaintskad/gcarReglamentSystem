import { startServer } from "./src/api/api.js";
import { getAllCars } from "./src/myTaxi/myTaxi.utils.js";
import { openSShTunnel } from "./ssh.js";

await openSShTunnel;

startServer();
