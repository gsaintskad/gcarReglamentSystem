import { getActualMyTaxiCarList } from "../../myTaxi/myTaxi.queries.js";
import { openMyTaxiSShTunnel } from "../../myTaxi/myTaxi.ssh.js";
import { devLog } from "../../shared/dev.utils.js";
import { getLastCarAcutalization } from "../reglament.queries.js";
import { actualizeCarsTransaction } from "../reglament.transactions.js";

export const actualizeCarList = async (): Promise<void> => {
    devLog('actualizing car list...')
    const last_actualization: Date | null = await getLastCarAcutalization()
    devLog({ last_actualization })


    const { rows: cars } = await getActualMyTaxiCarList(new Date(last_actualization ?? 0));
    await actualizeCarsTransaction(cars);
};
if (process.env.ENV === 'TEST') {
    devLog('running actualizeCarList in test mode...')
    await openMyTaxiSShTunnel
    actualizeCarList();

}