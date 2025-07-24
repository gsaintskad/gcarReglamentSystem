import { useCallback } from "react";
import * as reglamentTypes from "../reglament.types";
import api from "@/api/reglamentSystem.api";
import { useState } from "react";
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
import { Value } from "@radix-ui/react-select";
interface NewReglamentDialogProps {
  car_id: string;
}
export const NewReglamentDialog: React.FC<NewReglamentDialogProps> = (
  props: NewReglamentDialogProps
) => {
  const [reglament_type_id, setReglament_type_id] = useState<number>();
  const [mileage_deadline, setMileage_deadline] = useState<number>();
  const [
    mileage_before_deadeline_to_remember,
    setMileage_before_deadeline_to_remember,
  ] = useState<number>();
  const [comment, setComment] = useState<string>("");

  const createReglament = useCallback(
    async (dto: reglamentTypes.carReglamentDto) => {
      const response = await api.post("/reglaments/cars", props);
      return;
    },
    [
      reglament_type_id,
      mileage_deadline,
      mileage_before_deadeline_to_remember,
      comment,
      props,
    ]
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-1/4">NEW Reglament</Button>
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
          <Select onValueChange={(val) => console.log(val)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

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

export default NewReglamentDialog;
