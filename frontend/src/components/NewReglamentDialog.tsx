import { useCallback, useMemo } from "react";
import * as reglamentTypes from "../types/reglament.types";
import api from "@/api/reglamentSystem.api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getReglamentTypes } from "@/utils/reglament.utils";
import useMainContext from "@/contexts/MainContext";
import { Slider } from "@radix-ui/react-slider";
import { convertCyrillicToLatinLicensePlate } from "@/utils/shared.utils";
import { getMyTaxiCarByLicensePlate } from "@/utils/myTaxi.utils";
import { licensePlateCheckedCar } from "@/types/myTaxi.types";
interface NewReglamentDialogProps {
  cb: () => Promise<any>;
}
export const NewReglamentDialog: React.FC<NewReglamentDialogProps> = ({
  cb,
}: NewReglamentDialogProps) => {
  const [license_plate, setLicense_plate] = useState<string>();
  const [car, setCar] = useState<licensePlateCheckedCar | undefined>();
  const [reglament_type_id, setReglament_type_id] = useState<number>();
  const [mileage_deadline, setMileage_deadline] = useState<number>();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [
    mileage_before_deadline_to_remember,
    setMileage_before_deadline_to_remember,
  ] = useState<number>();
  const [comment, setComment] = useState<string>("");
  const is_car_found = useMemo<Boolean>(() => {
    return !!car && license_plate == car!.license_plate;
  }, [license_plate, car]);
  const createReglament = useCallback(async () => {
    const body = {
      reglament_type_id: String(reglament_type_id),
      car_id: String(car!.car_id),
      license_plate: String(car!.license_plate),
      auto_park_id: String(car!.auto_park_id),
      mileage_deadline,
      mileage_before_deadline_to_remember,
      telegram_id: 12345,
      comment,
      mileage_stamp: car!.actual_mileage,
    } as {
      reglament_type_id: string;
      car_id: string;
      license_plate: string;
      auto_park_id: string;
      mileage_deadline: number;
      mileage_before_deadline_to_remember: number;
      telegram_id: number;
      comment: string;
      mileage_stamp: number;
    };
    const response = await api.post("/reglaments/cars", body);
    await cb();
    return;
  }, [
    reglament_type_id,
    mileage_deadline,
    mileage_before_deadline_to_remember,
    comment,
    license_plate,
    car,
  ]);
  const { globalState } = useMainContext();
  const { reglamentTypes: types, i18n } = globalState;
  const { buttons: buttonsI18n, shared: sharedI18n, newReglament: newReglamentI18n, placeHolders: placeHoldersI18n } = i18n!
  const getAndSaveCarbyLicencePlate = useCallback(
    async (license_plate: string) => {
      const car = await getMyTaxiCarByLicensePlate(license_plate);
      car.actual_mileage = Number(car.actual_mileage);
      setCar(car as licensePlateCheckedCar);
    },
    [license_plate]
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-1/2">{buttonsI18n.newReglament}</Button>
      </DialogTrigger>
      <DialogContent className="h-3/4 max-sm:max-w-sm ">
        <DialogHeader>
          <DialogTitle>{newReglamentI18n.title}</DialogTitle>
          <DialogDescription>
            {newReglamentI18n.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 ">
          <Label>{sharedI18n.licensePlate}: </Label>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Input
                onChange={(e) => {
                  const val = e.target.value.toUpperCase();
                  setLicense_plate(convertCyrillicToLatinLicensePlate(val));
                }}
                value={license_plate}
                placeholder="AA1234AA"
              ></Input>
              <Button
                onClick={async () => {
                  getAndSaveCarbyLicencePlate(license_plate!);
                  setIsChecked(true);
                }}
              >
                Check
              </Button>
            </div>
            <Label className="font-bold">
              status:
              {!is_car_found && license_plate && isChecked && (
                <Label className="text-red-600">
                  {license_plate} not found!
                </Label>
              )}
              {is_car_found && isChecked && (
                <Label className="text-green-600">{license_plate} found!</Label>
              )}
              {!isChecked && (
                <Label>click the button to check {license_plate}</Label>
              )}
            </Label>
          </div>
          <Label>{sharedI18n.reglamentType}:</Label>
          <Select
            onValueChange={(val: string) => setReglament_type_id(Number(val))}
            disabled={!is_car_found}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {types!.map((type) => {
                return (
                  <SelectItem
                    key={`new-reglament-select-type-${type.id}`}
                    value={String(type.id)}
                  >
                    {type.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Label>{sharedI18n.notifyAfter}(KM): </Label>
          <Input
            disabled={!is_car_found}
            onChange={(e) => setMileage_deadline(Number(e.target.value))}
            placeholder="15000"
          ></Input>

          <Label>{sharedI18n.notifyBeforeCompletion}(KM):</Label>
          <Input
            disabled={!is_car_found}
            onChange={(e) =>
              setMileage_before_deadline_to_remember(Number(e.target.value))
            }
            placeholder="1000"
          ></Input>
          <Label>{sharedI18n.comment}:</Label>
          <Input
            disabled={!is_car_found}
            onChange={(e) => setComment(String(e.target.value))}
            placeholder={placeHoldersI18n.commentInput}
          ></Input>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={() => {
                createReglament();
                setCar(undefined);
                setLicense_plate(undefined);
                setReglament_type_id(undefined);
                setMileage_deadline(undefined);
                setMileage_before_deadline_to_remember(undefined);
                setComment("");
                cb();
              }}
            >
              {buttonsI18n.create}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewReglamentDialog;
