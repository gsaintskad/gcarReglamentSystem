import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { carReglamentDto } from "@/types/reglament.types";
import useMainContext from "@/contexts/MainContext";
import { useCallback, useMemo, useState } from "react";
import { getCarsJson } from "@/types/myTaxi.types";
import api from "@/api/reglamentSystem.api";
import { reglamentStateBgColors, reglamentStateColors } from "./constants";
import { bg } from "date-fns/locale";
interface ReglamentEditingDialogProps {
  reglament: carReglamentDto;
  cb: () => Promise<any>;
}
const ReglamentEditingDialog: React.FC<ReglamentEditingDialogProps> = (
  props: ReglamentEditingDialogProps
) => {
  const { reglament } = props;
  const { car_id, auto_park_id, actual_mileage, license_plate } = reglament;
  const [reglament_type_id, setReglament_type_id] = useState<number>(
    Number(reglament.reglament_type_id)
  );
  const [mileage_deadline, setMileage_deadline] = useState<number>(
    reglament.mileage_deadline
  );
  const [
    mileage_before_deadline_to_remember,
    setMileage_before_deadline_to_remember,
  ] = useState<number>(reglament.mileage_before_deadline_to_remember);
  const [comment, setComment] = useState<string>(reglament.comment);

  const updateReglament = useCallback(async () => {
    const body = {
      reglament_type_id,
      car_id,
      auto_park_id,
      mileage_deadline,
      mileage_before_deadline_to_remember,
      mileage_stamp: reglament.mileage_stamp,
      telegram_id: 12345,
      comment,
    };
    const response = await api.put("/reglaments/cars", body);
    return;
  }, [
    reglament_type_id,
    mileage_deadline,
    mileage_before_deadline_to_remember,
    comment,
    car_id,
    auto_park_id,
  ]);

  const { progress, progress_color, bg_color } = useMemo(() => {
    const progress = Math.floor(
      ((actual_mileage + 5 - reglament.mileage_stamp) /
        reglament.mileage_deadline) *
        100
    );
    let progress_color;
    let bg_color;
    if (progress >= 100) {
      progress_color = reglamentStateColors.expired;
      bg_color = reglamentStateBgColors.expired;
    } else if (progress >= 50) {
      progress_color = reglamentStateColors.soon;
      bg_color = reglamentStateBgColors.soon;
    } else {
      bg_color = reglamentStateBgColors.new;
      progress_color = reglamentStateColors.new;
    }

    return {
      progress,
      progress_color,
      bg_color,
    };
  }, [reglament, actual_mileage]);
  const { globalState } = useMainContext();
  const { reglamentTypes: types } = globalState;
  const { reglament_type_name, reglament_type_description } = useMemo<{
    reglament_type_name: string;
    reglament_type_description: string;
  }>(() => {
    const type = types!.find((type) => type.id === reglament_type_id);
    return {
      reglament_type_name: type!.name,
      reglament_type_description: type!.description,
    };
  }, [reglament_type_id, types]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow className=" rounded-lg" style={{ backgroundColor: bg_color }}>
          <TableCell className="font-medium">{license_plate}</TableCell>

          <TableCell className="font-medium">{reglament_type_name}</TableCell>
          <TableCell>{progress}%</TableCell>
          <TableCell>{mileage_deadline}</TableCell>
          <TableCell>{mileage_before_deadline_to_remember}</TableCell>
        </TableRow>
      </DialogTrigger>
      <DialogContent className="h-3/4">
        <DialogHeader>
          <DialogTitle>
            Регламент {reglament_type_name} машини {license_plate}
          </DialogTitle>
          <DialogDescription>
            Тут можна переглянути та внести зміни до регламентів машини
          </DialogDescription>
        </DialogHeader>
        <Button variant={"destructive"} onClick={() => updateReglament()}>
          Delete
        </Button>
        <div className="grid grid-cols-2 ">
          <Label>Тип регламенту</Label>
          <Select
            onValueChange={(val: string) => setReglament_type_id(Number(val))}
            value={String(reglament_type_id)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {types!.map((type) => {
                return (
                  <SelectItem
                    key={`select-type-${type.id}-${reglament.car_id}`}
                    value={String(type.id)}
                  >
                    {type.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Label>Опис регламенту</Label>
          <Label>{reglament_type_description}</Label>
          <Label>Deadline</Label>
          <Input defaultValue={mileage_deadline}></Input>

          <Label>Нагадати за:</Label>
          <Input defaultValue={mileage_before_deadline_to_remember}></Input>

          <Label>Прогресс</Label>
          <Label>{progress}%</Label>
        </div>
        <div className="flex bg-gray-300 rounded-full justify-start w-full h-3">
          <div
            className={`h-full rounded-full flex justify-end`}
            style={{
              width: `${progress}%`,
              backgroundColor: progress_color,
            }}
          >
            <Label className="translate-y-4">{progress}%</Label>
          </div>
        </div>
        <div className="flex">
          <Label>Коментар:</Label>
          <Label>{comment}</Label>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ReglamentEditingDialog;
