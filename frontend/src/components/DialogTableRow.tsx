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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReglamentEditingDialog from "./ReglamentEditingDialog";
import { getCarsJson } from "@/types/myTaxi.types";
import { useCallback, useState } from "react";
import api from "@/api/reglamentSystem.api";
import { carReglamentDto } from "@/types/reglament.types";
import NewReglamentDialog from "./NewReglamentDialog";
import { getCarReglamentByCarId } from "@/utils/reglament.utils";
export interface DialogTableRowProps {
  car: getCarsJson;
}
const DialogTableRow: React.FC<DialogTableRowProps> = (
  props: DialogTableRowProps
) => {
  const [reglaments, setReglaments] = useState<carReglamentDto[]>([]);
  const { car }: { car: getCarsJson } = props;
  const getReglaments = useCallback<() => Promise<getCarsJson>>(async () => {
    const carReglaments: carReglamentDto[] = await getCarReglamentByCarId(
      car.car_id
    );
    console.log(carReglaments);
    setReglaments(carReglaments);
    return car as getCarsJson;
  }, [car]);
  const { license_plate, model, color, city } = car;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow onClick={() => getReglaments()}>
          <TableCell className="font-medium">{license_plate}</TableCell>
          <TableCell>
            {model} {color}
          </TableCell>
          <TableCell>{city}</TableCell>
        </TableRow>
      </DialogTrigger>
      <DialogContent className="h-5/6">
        <DialogHeader>
          <DialogTitle>Регламенти авто {license_plate}</DialogTitle>
          <DialogDescription>
            Тут можна переглянути та внести зміни до регламентів авто{" "}
            {license_plate}
          </DialogDescription>
        </DialogHeader>
        <NewReglamentDialog car={car} />
        <Table className="h-16">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Регламент</TableHead>
              <TableHead>Прогресс</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className=" text-nowrap">Нагадати за:</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="h-16">
            {reglaments?.map((reglament) => (
              <ReglamentEditingDialog
                reglament={reglament}
                key={`${reglament.id}-${reglament.car_id}`}
              />
            ))}
          </TableBody>
        </Table>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DialogTableRow;
