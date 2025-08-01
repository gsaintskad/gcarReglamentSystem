select distinct on (coh.car_id) coh.car_id, coh.end_value as actual_mileage,coh.period_from as last_actualization,c.license_plate,c.created_at,ctap.auto_park_id
from car_odometer_history coh
join cars c on coh.car_id=c.id
join cars_to_auto_parks ctap on ctap.car_id= coh.car_id
where ctap.active_in_park=true and coh.period_from > $1
order by coh.car_id , coh.period_from desc;