select distinct on (coh.car_id) coh.car_id, coh.end_value as actual_mileage,coh.period_from as last_actualization
from car_odometer_history coh
where coh.car_id=$1
order by coh.car_id , coh.period_from desc
