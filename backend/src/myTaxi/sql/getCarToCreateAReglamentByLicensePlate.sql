select distinct on (coh.car_id) coh.car_id,c.license_plate, coh.end_value as actual_mileage,coh.period_from as last_actualization, ap.name,ap.id as auto_park_id
from car_odometer_history coh
join cars c on c.id=coh.car_id
join cars_to_auto_parks ctap on ctap.car_id=c.id and ctap.active_in_park=true
join auto_parks ap on ap.id=ctap.auto_park_id
where c.license_plate=$1
order by coh.car_id, coh.period_from desc;