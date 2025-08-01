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
import { convertCyrillicToLatinLicensePlate } from "@/utils/shared.utils";
interface ReglamentSelectionTableProps {}

const ReglamentSelectionTable: React.FC<ReglamentSelectionTableProps> = (
  props: ReglamentSelectionTableProps,
) => {
  const [filter, setFilter] = useState("");
  const [filterType, setFilterType] = useState("license_plate");
  const [reglament_type_id, setReglament_type_id] = useState<number>(0);
  const { globalState, setGlobalState } = useMainContext();
  const { reglaments, reglamentTypes: types, i18n } = globalState;
  const { buttons, placeHolders, shared } = i18n!;
  return (
    <div className="flex flex-col overflow-hidden gap-3">
      <div className="flex max-sm:flex-col max-sm:content-between items-center gap-5">
        <div className="flex items-center flex-nowrap gap-5">
          <Label className="text-nowrap">{shared.searchBy}:</Label>
          <Select
            onValueChange={(val: string) => setFilterType(val)}
            value={filterType}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"license_plate"}>
                {shared.licensePlate}
              </SelectItem>
              {/* <SelectItem value={"city"}>city</SelectItem> */}
              <SelectItem value={"reglamentType"}>
                {shared.reglamentType}
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={() => window.location.reload()}
            className="block md:hidden"
          >
            {buttons.reload}
          </Button>
        </div>
        <div className="flex gap-3">
          {filterType === "reglamentType" ? (
            <Select
              onValueChange={(val: string) => setReglament_type_id(Number(val))}
              value={String(reglament_type_id)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeHolders.reglamentTypeSelect} />
              </SelectTrigger>
              <SelectContent>
                {types!.map((type) => {
                  return (
                    <SelectItem
                      key={`ReglamentSelectionTable-select-type-${type.id}`}
                      value={String(type.id)}
                    >
                      {type.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          ) : (
            <Input
              placeholder={placeHolders.search}
              onChange={(e) =>
                setFilter(
                  convertCyrillicToLatinLicensePlate(
                    e.target.value,
                  ).toUpperCase(),
                )
              }
            />
          )}

          <NewReglamentDialog
            cb={async () => {
              window.location.reload();
            }}
          />
        </div>
      </div>
      <Table className="w-full ">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-black">
              {shared.licensePlate}
            </TableHead>
            <TableHead>{shared.reglamentType}</TableHead>
            <TableHead className="text-center">
              {shared.remainingMileage} (KM)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-y-auto">
          {reglaments!
            .filter((reglament) => {
              if (filterType === "license_plate") {
                return reglament.license_plate.includes(filter);
              }
              // if (filterType === "city") {
              //   return reglament.city.includes(filter);
              // }
              if (filterType === "reglamentType") {
                if (!reglament_type_id) {
                  return true;
                }
                return reglament.reglament_type_id == String(reglament_type_id);
              }
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
          <TableRow></TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
export default ReglamentSelectionTable;
