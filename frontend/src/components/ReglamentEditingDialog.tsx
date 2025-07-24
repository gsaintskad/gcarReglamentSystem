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
import { carReglamentDto } from "@/types/reglament.types";
interface ReglamentEditingDialogProps {
  reglament: carReglamentDto;
}
const ReglamentEditingDialog: React.FC<ReglamentEditingDialogProps> = (
  props: ReglamentEditingDialogProps
) => {
  const { reglament } = props;
  const {
    id,
    mileage_before_deadline_to_remember,
    mileage_deadline,
    reglament_type_id,
    mileage_stamp,
  } = reglament;
  const progress = Math.floor(
    ((mileage_stamp + 5 - mileage_stamp) / mileage_deadline) * 100
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow>
          <TableCell className="font-medium">{reglament_type_id}</TableCell>
          <TableCell>{progress}%</TableCell>
          <TableCell>{mileage_deadline}</TableCell>
          <TableCell>{mileage_before_deadline_to_remember}</TableCell>
        </TableRow>
      </DialogTrigger>
      <DialogContent className="h-3/4">
        <DialogHeader>
          <DialogTitle>Регламенти машини</DialogTitle>
          <DialogDescription>
            Тут можна переглянути та внести зміни до регламентів машини
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 ">
          <Label>Тип регламенту</Label>
          <Input></Input>

          <Label>Маркер</Label>
          <Input></Input>

          <Label>Нагадати за:</Label>
          <Input></Input>

          <Label>Прогресс</Label>
          <Label>59%</Label>
        </div>

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
export default ReglamentEditingDialog;
