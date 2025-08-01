import { startServer } from "./src/api/api.js";
import { openMyTaxiSShTunnel } from "./src/myTaxi/myTaxi.ssh.js";
import reglamentJobs from "./src/reglaments/reglament.bootstrap.js";
import { devLog } from "./src/shared/dev.utils.js";

await openMyTaxiSShTunnel;

reglamentJobs();
startServer();
devLog();
devLog("application running...");
