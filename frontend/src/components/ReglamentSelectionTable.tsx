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
import DialogTableRow from "./DialogTableRow";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCarsJson } from "@/types/myTaxi.types";
import { Input } from "./ui/input";
import { useCallback, useState } from "react";
import { Label } from "@radix-ui/react-label";
import NewReglamentDialog from "./NewReglamentDialog";
import {
  getCarReglamentByCarId,
  getCarReglaments,
} from "@/utils/reglament.utils";
import { carReglamentDto } from "@/types/reglament.types";
import ReglamentEditingDialog from "./ReglamentEditingDialog";
interface ReglamentSelectionTableProps {}

const ReglamentSelectionTable: React.FC<ReglamentSelectionTableProps> = (
  props: ReglamentSelectionTableProps
) => {
  const [filter, setFilter] = useState("");
  const [filterType, setFilterType] = useState("license_plate");
  const [reglaments, setReglaments] = useState<carReglamentDto[]>([]);
  const getReglaments = useCallback<() => Promise<void>>(async () => {
    const carReglaments: carReglamentDto[] = await getCarReglaments();
    console.log(carReglaments);
    setReglaments(carReglaments);
  }, []);
  return (
    <div className="flex flex-col overflow-hidden gap-3">
      <NewReglamentDialog cb={async () => console.log("cb")} />
      <div className="flex max-sm:flex-col max-sm:content-between items-center gap-5">
        <div className="flex items-center flex-nowrap gap-5">
          <Label className="text-nowrap">Пошук по:</Label>
          <Select
            onValueChange={(val: string) => setFilterType(val)}
            value={filterType}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"license_plate"}>license plate</SelectItem>
              <SelectItem value={"city"}>city</SelectItem>
              <SelectItem value={"reglamentType"}>reglamentType</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Input
          placeholder="Search..."
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <Table className="w-full ">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-black">Номер авто</TableHead>
            <TableHead>Тип Регламенту</TableHead>
            <TableHead>Залишилось(КМ)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-y-auto">
          {reglaments
            .filter((reglament) => {
              // if (filterType === "license_plate") {
              //   return reglament.license_plate.includes(filter);
              // }
              // if (filterType === "city") {
              //   return reglament.city.includes(filter);
              // }
              // if (filterType === "reglamentType") {
              //   return reglament.reglament_type_name.includes(filter);
              // }
              return true;
            })
            .map((reglament, i) => (
              <ReglamentEditingDialog
                reglament={reglament}
                cb={async () => console.log("cb")}
              />
              // <DialogTableRow car={car} key={`car-${car.license_plate}-${i}`} />
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
export default ReglamentSelectionTable;
