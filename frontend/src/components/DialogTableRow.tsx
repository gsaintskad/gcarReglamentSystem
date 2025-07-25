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
import { Link } from "lucide-react";
export interface DialogTableRowProps {
  car: getCarsJson;
}
const DialogTableRow: React.FC<DialogTableRowProps> = (
  props: DialogTableRowProps
) => {
  const { car }: { car: getCarsJson } = props;
  const [reglaments, setReglaments] = useState<carReglamentDto[]>([]);
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
        <div className="flex flex-col justify-between">
          <div className="flex justify-between gap-3">
            <Button
              variant={"outline"}
              className=""
              onClick={() =>
                window.open(
                  `https://fleets.mytaxicrm.com/company-cars/${car.car_id}`,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              myTaxi
            </Button>
            <NewReglamentDialog cb={getReglaments} />
          </div>
          <Table className="h-16">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Регламент</TableHead>
                <TableHead>Прогресс</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className=" text-nowrap">Нагадати за:</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reglaments?.map((reglament) => (
                <ReglamentEditingDialog
                  reglament={reglament}
                  cb={getReglaments}
                  key={`${reglament.id}-${reglament.car_id}`}
                />
              ))}
            </TableBody>
          </Table>
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
export default DialogTableRow;
