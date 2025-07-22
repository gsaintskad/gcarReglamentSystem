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
export interface DialogTableRowProps {}
const DialogTableRow: React.FC<{}> = (props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow>
          <TableCell className="font-medium">AA1234AA</TableCell>
          <TableCell>Audi a4 white</TableCell>
          <TableCell>Київ</TableCell>
        </TableRow>
      </DialogTrigger>
      <DialogContent className="h-5/6">
        <DialogHeader>
          <DialogTitle>Регламенти авто AA1234AA</DialogTitle>
          <DialogDescription>
            Тут можна переглянути та внести зміни до регламентів авто AA1234AA
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
