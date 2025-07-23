import { startServer } from "./src/api/api.js";
import { openMyTaxiSShTunnel } from "./src/myTaxi/myTaxi.ssh.js";
import { devLog } from "./src/shared/dev.utils.js";

await openMyTaxiSShTunnel;

startServer();
devLog('application running...')