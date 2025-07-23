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
import { getCarsJson } from "@/myTaxi.types";
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];
export interface DialogTableRowProps {
  car: getCarsJson;

}
const DialogTableRow: React.FC<DialogTableRowProps> = (
  props: DialogTableRowProps
) => {
  const { car }: { car: getCarsJson } = props;

  const { license_plate, model, color, city } = car;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow >
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
        <Table className="h-16">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Регламент</TableHead>
              <TableHead>Прогресс</TableHead>
              <TableHead>Ціль</TableHead>
              <TableHead className="text-right text-nowrap">
                Нагадати за:
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="h-16">
            {invoices.map((invoice) => (
              <ReglamentEditingDialog />
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
