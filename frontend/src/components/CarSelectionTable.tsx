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
import { useState } from "react";
import { Label } from "@radix-ui/react-label";
interface CarSelectionTableProps {
  cars: getCarsJson[];
}

const CarSelectionTable: React.FC<CarSelectionTableProps> = (
  props: CarSelectionTableProps
) => {
  const { cars }: { cars: getCarsJson[] } = props;
  const [filter, setFilter] = useState("");
  const [filterType, setFilterType] = useState("license_plate");
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
              <SelectItem value={"model"}>model</SelectItem>
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
            <TableHead>Модель</TableHead>
            <TableHead>Місто</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-y-auto">
          {cars
            .filter((car) => {
              if (filterType === "license_plate") {
                return car.license_plate.includes(filter);
              }
              if (filterType === "city") {
                return car.city.includes(filter);
              }
              if (filterType === "model") {
                return car.model.includes(filter);
              }
              return true;
            })
            .map((car, i) => (
              <DialogTableRow car={car} key={`car-${car.license_plate}-${i}`} />
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
export default CarSelectionTable;
