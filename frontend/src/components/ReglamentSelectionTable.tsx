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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { useCallback, useState } from "react";
import { Label } from "@radix-ui/react-label";
import NewReglamentDialog from "./NewReglamentDialog";
import {
  getCarReglamentByCarId,
  getCarReglaments,
  getReglamentTypes,
} from "@/utils/reglament.utils";
import { carReglamentDto } from "@/types/reglament.types";
import ReglamentEditingDialog from "./ReglamentEditingDialog";
import useMainContext from "@/contexts/MainContext";
interface ReglamentSelectionTableProps {}

const ReglamentSelectionTable: React.FC<ReglamentSelectionTableProps> = (
  props: ReglamentSelectionTableProps
) => {
  const [filter, setFilter] = useState("");
  const [filterType, setFilterType] = useState("license_plate");
  // const [reglaments, setReglaments] = useState<carReglamentDto[]>([]);
  const { globalState, setGlobalState } = useMainContext();
  const { reglaments } = globalState;
  return (
    <div className="flex flex-col overflow-hidden gap-3">
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

          <Button
            onClick={() => window.location.reload()}
            className="block md:hidden"
          >
            Reload
          </Button>
        </div>
        <div className="flex gap-3">
          <Input
            placeholder="Search..."
            onChange={(e) => setFilter(e.target.value)}
          />

          <NewReglamentDialog
            cb={async () => {
              window.location.reload();
            }}
          />
        </div>
      </div>
      <Table className="w-full ">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-black">Номер авто</TableHead>
            <TableHead>Тип Регламенту</TableHead>
            <TableHead className="text-center">Дедлайн (км)</TableHead>
            <TableHead className="text-center">Нагадати за (км):</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-y-auto">
          {reglaments!
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
                key={`reglament-${reglament.car_id}-${i}`}
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
