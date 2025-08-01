import actualizeCarListJob from "./jobs/actualize-car-list-job.js"

const startReglamentJobs = (): void => {
    actualizeCarListJob.start()
}
const stopReglamentJobs = (): void => {
    actualizeCarListJob.stop()
}
const reglamentJobs = (): void => {
    try {
        startReglamentJobs()
    }
    catch (error) {
        console.error({ error, time: new Date(), message: 'Error occurred in a reglament job' })
        stopReglamentJobs()
        reglamentJobs();
    }

}

export default reglamentJobs;