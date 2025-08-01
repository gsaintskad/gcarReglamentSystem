import { startServer } from "./src/api/api.js";
import { openMyTaxiSShTunnel } from "./src/myTaxi/myTaxi.ssh.js";
import reglamentJobs from "./src/reglaments/reglament.bootstrap.js";
import { devLog } from "./src/shared/dev.utils.js";

await openMyTaxiSShTunnel;

// console.log(await getActualMyTaxiCarList(new Date('2025-08-01T11:00:00.000Z')));
reglamentJobs();
startServer();
devLog();
devLog("application running...");
