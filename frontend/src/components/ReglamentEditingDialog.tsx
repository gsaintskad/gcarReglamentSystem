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
import { useCallback, useEffect, useMemo, useState } from "react";
import api from "@/api/reglamentSystem.api";
import { reglamentStateBgColors, reglamentStateColors } from "./constants";
import { bg } from "date-fns/locale";
import { getMyTaxiCarActualMileage } from "@/utils/myTaxi.utils";
import {
  deleteCarReglament,
  updateCarReglament,
} from "@/utils/reglament.utils";
interface ReglamentEditingDialogProps {
  reglament: carReglamentDto;
  cb: () => Promise<any>;
}
const ReglamentEditingDialog: React.FC<ReglamentEditingDialogProps> = (
  props: ReglamentEditingDialogProps
) => {
  const { reglament } = props;

  const { car_id, auto_park_id, mileage_stamp, license_plate } = reglament;
  const [reglament_type_id, setReglament_type_id] = useState<number>(
    Number(reglament.reglament_type_id)
  );
  const [mileage_deadline, setMileage_deadline] = useState<number>(
    reglament.mileage_deadline
  );
  const [actualMileage, setActualMileage] = useState<number>();
  const [isEditingModeTurnedOn, setIsEditingModeTurnedOn] =
    useState<boolean>(false);
  const [
    mileage_before_deadline_to_remember,
    setMileage_before_deadline_to_remember,
  ] = useState<number>(reglament.mileage_before_deadline_to_remember);
  const [comment, setComment] = useState<string>(reglament.comment);
  // getMyTaxiCarActualMileage(car_id).then((mileage) => {
  //   console.log({ mileage, mileage_stamp });
  //   setActualMileage(mileage);
  //   console.log({ actualMileage, mileage });
  // });
  useEffect(() => {
    (async () => {
      const mileage = await getMyTaxiCarActualMileage(car_id);

      setActualMileage(mileage);
    })();
  }, [car_id]);

  const { progress, progress_color, bg_color } = useMemo(() => {
    let progress = Math.floor(
      ((actualMileage! - reglament.mileage_stamp) / (mileage_deadline * 1000)) *
        100
    );
    if (mileage_deadline == 0) {
      progress = 100;
    }
    const notify_marker = Math.floor(
      ((mileage_deadline - mileage_before_deadline_to_remember) /
        mileage_deadline) *
        100
    );
    let progress_color;
    let bg_color;
    if (progress >= 100) {
      progress_color = reglamentStateColors.expired;
      bg_color = reglamentStateBgColors.expired;
    } else if (progress >= notify_marker) {
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
  }, [
    reglament,
    mileage_stamp,
    actualMileage,
    mileage_before_deadline_to_remember,
    mileage_deadline,
  ]);
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
  // console.log({ reglament, progress, progress_color, bg_color });
  return actualMileage ? (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow className=" rounded-lg" style={{ backgroundColor: bg_color }}>
          <TableCell className="font-medium">{license_plate}</TableCell>

          <TableCell className="font-medium ">{reglament_type_name}</TableCell>
          <TableCell className="text-center">{mileage_deadline}</TableCell>
          <TableCell className="text-center">
            {mileage_before_deadline_to_remember}
          </TableCell>
        </TableRow>
      </DialogTrigger>
      <DialogContent className="h-3/4">
        <DialogHeader>
          <DialogTitle>
            Регламент {reglament_type_name} авто {license_plate}
          </DialogTitle>
          <DialogDescription>
            Тут можна переглянути та внести зміни до регламентів машини
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between gap-3">
          <Button
            variant={"destructive"}
            onClick={async () => {
              await deleteCarReglament(
                Number(reglament.id),
                77777 //telegram_id
              );
              window.location.reload();
            }}
            className="w-1/2"
          >
            Delete
          </Button>
          <Button
            variant={"outline"}
            onClick={async () => {
              setIsEditingModeTurnedOn(
                (isEditingModeTurnedOn) => !isEditingModeTurnedOn
              );
              if (isEditingModeTurnedOn) {
                await updateCarReglament(
                  {
                    comment,
                    reglament_type_id,
                    mileage_deadline,
                    mileage_before_deadline_to_remember,
                    telegram_id: 12345,
                  },
                  reglament
                );
                window.location.reload();
              }
            }}
            className="w-1/2"
          >
            {isEditingModeTurnedOn ? "save" : "Edit"}
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3 ">
          <Label>Тип регламенту</Label>

          {isEditingModeTurnedOn ? (
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
          ) : (
            <Label>{reglament_type_name}</Label>
          )}
          <Label>Deadline</Label>
          {isEditingModeTurnedOn ? (
            <Input
              defaultValue={mileage_deadline}
              onChange={(e) => setMileage_deadline(Number(e.target.value))}
            ></Input>
          ) : (
            <Label>{mileage_deadline}</Label>
          )}

          <Label>Нагадати за:</Label>
          {isEditingModeTurnedOn ? (
            <Input
              defaultValue={mileage_before_deadline_to_remember}
              onChange={(e) =>
                setMileage_before_deadline_to_remember(Number(e.target.value))
              }
            ></Input>
          ) : (
            <Label>{mileage_before_deadline_to_remember}</Label>
          )}

          <Label>Коментар:</Label>

          {isEditingModeTurnedOn ? (
            <Input
              defaultValue={comment}
              onChange={(e) => setComment(String(e.target.value))}
            ></Input>
          ) : (
            <Label>{comment}</Label>
          )}
          <Label>Прогресс</Label>
          <Label>{progress}%</Label>
        </div>
        <div className="h-32 flex items-center justify-center ">
          <Label className="mr-3 text-nowrap">0 KM </Label>
          <div className="flex bg-gray-300 rounded-full justify-start w-[60%] h-3">
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

          <Label className="ml-3 text-nowrap">
            {mileage_deadline} KM
          </Label>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={async () => {
                await updateCarReglament(
                  {
                    comment,
                    reglament_type_id,
                    mileage_deadline,
                    mileage_before_deadline_to_remember,
                    telegram_id: 12345,
                  },
                  reglament
                );
                window.location.reload();
              }}
            >
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <Label>Loading...</Label>
  );
};
export default ReglamentEditingDialog;
