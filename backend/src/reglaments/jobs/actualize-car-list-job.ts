import { CronJob } from 'cron';
import { actualizeCarList } from '../modules/actualize-car-list.js';

const cronTime = '15 * * * *';
// You can specify your desired time zone here.
const timeZone = 'Europe/London';

const actualizeCarListJob = CronJob.from({
    cronTime,
    timeZone,
    onTick: async () => {
        try {
            await actualizeCarList()
        } catch (error) {
            console.error('Error occurred in car actualization job:', {
                time: new Date(),
                error,
            });
        }
    },
   
});

// Optionally export the job if you need to manage it from another file.
export default actualizeCarListJob;

