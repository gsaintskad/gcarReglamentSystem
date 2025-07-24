import { useCallback } from "react";
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
import { getCarsJson } from "@/types/myTaxi.types";
interface NewReglamentDialogProps {
  car: getCarsJson;
  cb: () => Promise<any>;
}
export const NewReglamentDialog: React.FC<NewReglamentDialogProps> = ({
  car,
  cb,
}: NewReglamentDialogProps) => {
  const { car_id, auto_park_id, mileage: mileage_stamp } = car;
  const [reglament_type_id, setReglament_type_id] = useState<number>();
  const [mileage_deadline, setMileage_deadline] = useState<number>();
  const [
    mileage_before_deadline_to_remember,
    setMileage_before_deadline_to_remember,
  ] = useState<number>();
  const [comment, setComment] = useState<string>("");

  const createReglament = useCallback(async () => {
    const body = {
      reglament_type_id,
      car_id,
      auto_park_id,
      mileage_deadline,
      mileage_before_deadline_to_remember,
      mileage_stamp,
      telegram_id: 12345,
      comment,
    };
    const response = await api.post("/reglaments/cars", body);
    cb();
    return;
  }, [
    reglament_type_id,
    mileage_deadline,
    mileage_before_deadline_to_remember,
    comment,
    car_id,
    auto_park_id,
    mileage_stamp,
  ]);
  const { globalState } = useMainContext();
  const { reglamentTypes: types } = globalState;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-1/2">NEW Reglament</Button>
      </DialogTrigger>
      <DialogContent className="h-3/4">
        <DialogHeader>
          <DialogTitle>Регламенти машини</DialogTitle>
          <DialogDescription>
            Тут можна переглянути та внести зміни до регламентів машини
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 ">
          <Label>Тип регламенту</Label>
          <Select
            onValueChange={(val: string) => setReglament_type_id(Number(val))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {types!.map((type) => {
                return (
                  <SelectItem
                    key={`new-reglament-select-type-${type.id}-${car.car_id}`}
                    value={String(type.id)}
                  >
                    {type.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Label>Deadline(km): </Label>
          <Input
            onChange={(e) => setMileage_deadline(Number(e.target.value))}
            placeholder="15000"
          ></Input>

          <Label>Нагадати за (km):</Label>
          <Input
            onChange={(e) =>
              setMileage_before_deadline_to_remember(Number(e.target.value))
            }
            placeholder="1000"
          ></Input>
          <Label>Коментар:</Label>
          <Input
            onChange={(e) => setComment(String(e.target.value))}
            placeholder="Учтонення інформації..."
          ></Input>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={() => createReglament()}>
              Create reglament
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewReglamentDialog;
