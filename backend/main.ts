import { startServer } from "./src/api/api.js";
import { openMyTaxiSShTunnel } from "./src/myTaxi/myTaxi.ssh.js";
import { testCallReglamentPool } from "./src/reglaments/reglament.queries.js";
import { devLog } from "./src/shared/dev.utils.js";

await openMyTaxiSShTunnel;

startServer();
// const a = await testCallReglamentPool();
// console.log(a);
devLog("application running...");
