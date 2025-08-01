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
  props: ReglamentEditingDialogProps,
) => {
  const { reglament } = props;

  const { globalState } = useMainContext();
  const { reglamentTypes: types, i18n, availableCarList, autoParks } = globalState;
  const {
    shared: sharedI18n,
    buttons: buttonsI18n,
    placeHolders: placeHoldersI18n,
    editReglament: editReglamentI18n,
  } = i18n!;
  const { car_id, auto_park_id, mileage_stamp, license_plate } = reglament;
  const [reglament_type_id, setReglament_type_id] = useState<number>(
    Number(reglament.reglament_type_id),
  );
  const [mileage_deadline, setMileage_deadline] = useState<number>(
    reglament.mileage_deadline,
  );
  const [actualMileage, setActualMileage] = useState<number>(
    Number(
      availableCarList.find((car) => car.car_id === car_id)?.actual_mileage,
    ),
  );
  const [isEditingModeTurnedOn, setIsEditingModeTurnedOn] =
    useState<boolean>(false);
  const [
    mileage_before_deadline_to_remember,
    setMileage_before_deadline_to_remember,
  ] = useState<number>(reglament.mileage_before_deadline_to_remember);
  const [comment, setComment] = useState<string>(reglament.comment);

  const { progress, progress_color, bg_color } = useMemo(() => {
    let progress = Math.min(
      Math.floor(
        ((actualMileage! - reglament.mileage_stamp) /
          (mileage_deadline * 1000)) *
        100,
      ),
      100,
    );

    if (mileage_deadline == 0) {
      progress = 100;
    }
    const notify_marker = Math.floor(
      ((mileage_deadline - mileage_before_deadline_to_remember) /
        mileage_deadline) *
      100,
    );
    let progress_color;
    let bg_color;
    if (progress === 100) {
      progress_color = reglamentStateColors.expired;
      bg_color = reglamentStateBgColors.expired;
    } else if (progress >= notify_marker) {
      progress_color = reglamentStateColors.soon;
      bg_color = reglamentStateBgColors.soon;
    } else {
      bg_color = reglamentStateBgColors.new;
      progress_color = reglamentStateColors.new;
    }
    console.log({
      progress,
      progress_color,
      bg_color,
    });
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
  const mileageLeftOver = useMemo(() => {
    if (!actualMileage || !mileage_deadline) return 0;
    return Math.floor(
      mileage_deadline - (actualMileage - reglament.mileage_stamp) / 1000,
    );
  }, [actualMileage, mileage_deadline]);
  // console.log({ reglament, progress, progress_color, bg_color });
  return actualMileage ? (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow className=" rounded-lg" style={{ backgroundColor: bg_color }}>
          <TableCell className="font-medium">{license_plate}</TableCell>

          <TableCell className="font-medium ">{reglament_type_name}</TableCell>

          <TableCell className="text-center">{mileageLeftOver}</TableCell>
        </TableRow>
      </DialogTrigger>
      <DialogContent className="h-3/4 max-sm:max-w-sm ">
        <DialogHeader>
          <DialogTitle>
            {sharedI18n.reglament} {license_plate} #{reglament.id!}
          </DialogTitle>
          <DialogDescription>{editReglamentI18n.description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-between gap-3">
          <Button
            variant={"destructive"}
            onClick={async () => {
              await deleteCarReglament(
                Number(reglament.id),
                77777, //telegram_id
              );
              window.location.reload();
            }}
            className="w-1/2"
          >
            {buttonsI18n.delete}
          </Button>
          <Button
            variant={"outline"}
            onClick={async () => {
              setIsEditingModeTurnedOn(
                (isEditingModeTurnedOn) => !isEditingModeTurnedOn,
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
                  reglament,
                );
                window.location.reload();
              }
            }}
            className="w-1/2"
          >
            {isEditingModeTurnedOn ? buttonsI18n.save : buttonsI18n.edit}
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3 ">
          <Label>{sharedI18n.reglamentType}:</Label>

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
          <Label>{sharedI18n.autoPark}:</Label>
          <Label>{autoParks.find((autoPark) => autoPark.id === reglament?.auto_park_id)?.name}</Label>
          <Label>{sharedI18n.mileage}(KM):</Label>
          <Label>{Math.floor(actualMileage / 1000)}</Label>
          <Label>{sharedI18n.notifyAfter} (KM):</Label>
          {isEditingModeTurnedOn ? (
            <Input
              defaultValue={mileage_deadline}
              onChange={(e) => setMileage_deadline(Number(e.target.value))}
            ></Input>
          ) : (
            <Label>{mileage_deadline}</Label>
          )}

          <Label>{sharedI18n.notifyBeforeCompletion} (KM):</Label>
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

          <Label>{sharedI18n.comment}:</Label>

          {isEditingModeTurnedOn ? (
            <Input
              defaultValue={comment}
              onChange={(e) => setComment(String(e.target.value))}
            ></Input>
          ) : (
            <Label>{comment}</Label>
          )}
          <Label>{sharedI18n.progress}:</Label>
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

          <Label className="ml-3 text-nowrap">{mileage_deadline} KM</Label>
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
                  reglament,
                );
                window.location.reload();
              }}
            >
              {buttonsI18n.saveChanges}
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
