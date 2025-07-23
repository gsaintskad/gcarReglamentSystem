select c.license_plate,c.id as car_id, c.color , cm.model  ,ap."name"as city,ap.id as auto_park_id,c.odometer as mileage
from cars c 
	join car_models cm on cm.id=c.model_id 
	join cars_to_auto_parks ctap on ctap.car_id =c.id 
	join auto_parks ap on ctap.auto_park_id=ap.id and ctap.active_in_park = true
Limit 50