import { getAllCars } from "./src/myTaxi/myTaxi.utils.js";
import { openSShTunnel } from "./ssh.js";

await openSShTunnel;
const cars = await getAllCars();
console.log(cars);
console.log("test");
