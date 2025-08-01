import { reglamentPool } from './reglament.pool.js'
import pg from 'pg';

// Define the interface for a Car based on your JSON format
// We'll use 'string' for actual_mileage to match your input,
// and then convert it before the query.
interface Car {
    car_id: string;
    actual_mileage: string;
    last_actualization: Date;
    license_plate: string;
    created_at: Date;
    auto_park_id: string;
}

export const actualizeCarsTransaction = async (carsToUpdate: Car[]): Promise<void> => {
    console.log(`Starting car actualization transaction via pool at ${new Date().toISOString()}`);

    let client: pg.PoolClient | null = null; // Initialize client to null for finally block

    try {
        // Acquire a client from the pool
        client = await reglamentPool.connect();

        // Begin the transaction
        await client!.query('BEGIN');
        console.log('Transaction started.');

        const carIdsToDelete = carsToUpdate.map(car => car.car_id);

        if (carIdsToDelete.length > 0) {
            // Delete existing records that match the IDs in the new array
            const deleteResult = await client!.query(
                'DELETE FROM cars WHERE car_id = ANY($1::uuid[])',
                [carIdsToDelete]
            );
            console.log(`Deleted ${deleteResult.rowCount} car records.`);
        }

        if (carsToUpdate.length > 0) {
            // Prepare data for bulk insert.
            // We are using UNNEST, which is highly efficient for bulk inserts.
            const now = new Date();
            
            // Map the input array to the correct data types for the SQL query.
            const car_ids = carsToUpdate.map(car => car.car_id);
            // Convert string to BigInt to prevent data loss.
            const actual_mileages = carsToUpdate.map(car => BigInt(car.actual_mileage));
            const last_actualizations = carsToUpdate.map(car => car.last_actualization);
            const license_plates = carsToUpdate.map(car => car.license_plate);
            const auto_park_ids = carsToUpdate.map(car => car.auto_park_id);
            const created_ats = carsToUpdate.map(car => car.created_at);
            // The input JSON doesn't have updated_at, so we'll use the current timestamp.
            // Removing the updated_at as the column does not exist in the DB.
            // const updated_ats = carsToUpdate.map(() => now);

            const insertQuery = `
        INSERT INTO cars (car_id, actual_mileage, last_actualization, license_plate, auto_park_id, created_at)
        SELECT * FROM UNNEST(
          $1::uuid[], 
          $2::bigint[], 
          $3::timestamptz[], 
          $4::text[], 
          $5::uuid[], 
          $6::timestamptz[]
        ) AS t(car_id, actual_mileage, last_actualization, license_plate, auto_park_id, created_at);
      `;

            const insertResult = await client!.query(insertQuery, [
                car_ids,
                actual_mileages,
                last_actualizations,
                license_plates,
                auto_park_ids,
                created_ats,
            ]);
            console.log(`Successfully inserted ${insertResult.rowCount} new car records.`);
        } else {
            console.log('No new cars to insert.');
        }

        // Commit the transaction
        await client!.query('COMMIT');
        console.log('Transaction committed successfully.');

    } catch (error) {
        // Rollback the transaction on error
        if (client) {
            await client.query('ROLLBACK');
            console.error('Failed to actualize cars. Transaction rolled back.');
        }
        console.error('Error during transaction:', error);
        throw error; // Re-throw the error for upstream handling
    } finally {
        // Release the client back to the pool
        if (client) {
            client.release();
            console.log('Client released back to pool.');
        }
    }
};
