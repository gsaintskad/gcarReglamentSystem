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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getCarsJson } from "@/myTaxi.types";
interface CarSelectionTableProps {
  cars: getCarsJson[];
}

const CarSelectionTable: React.FC<CarSelectionTableProps> = (
  props: CarSelectionTableProps
) => {
  const { cars }: { cars: getCarsJson[] } = props;
  return (
    <Table className="w-full">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] font-black">Номер авто</TableHead>
          <TableHead>Модель</TableHead>
          <TableHead>Місто</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="overflow-y-auto">
        {cars.map((car, i) => (
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
  );
};
export default CarSelectionTable;
