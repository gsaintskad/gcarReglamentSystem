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
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface AvailableCar{
  car_id:string,
  license_plate:string,
  actual_mileage:number,
  last_actualization:Date,
  auto_park_id:string,
}
export interface AutoPark {
  id: string,
  name: string
}
interface ReglamentSelectionTableProps { }

const ReglamentSelectionTable: React.FC<ReglamentSelectionTableProps> = (
  props: ReglamentSelectionTableProps,
) => {
  const [filter, setFilter] = useState("");
  const [filterType, setFilterType] = useState("license_plate");
  const [reglament_type_id, setReglament_type_id] = useState<number>(0);
  const { globalState, setGlobalState } = useMainContext();
  const { reglaments, reglamentTypes: types, i18n, autoParks } = globalState;
  const { buttons, placeHolders, shared } = i18n!;
  
  // State for the auto park combobox
  const [openAutoPark, setOpenAutoPark] = useState(false);
  const [selectedAutoPark, setSelectedAutoPark] = useState<AutoPark | undefined>();
  
  return (
    <div className="flex flex-col overflow-hidden gap-3">
      <div className="flex max-sm:flex-col max-sm:content-between items-center gap-5">
        <div className="flex items-center flex-nowrap gap-3">
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
              <SelectItem value={"autoPark"}>{shared.autoPark}</SelectItem>
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
          {filterType === "reglamentType" && (
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
          )}
          {filterType === "license_plate" && (
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
          {filterType === "autoPark" && (
            <Popover open={openAutoPark} onOpenChange={setOpenAutoPark}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openAutoPark}
                  className="w-[180px] justify-between"
                >
                  {selectedAutoPark ? selectedAutoPark.name :placeHolders.autoParkInput }
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[180px] p-0">
                <Command>
                  <CommandInput placeholder={placeHolders.autoParkInput} />
                  <CommandEmpty>No autoPark found.</CommandEmpty>
                  <CommandGroup>
                    {autoParks.map((autoPark) => (
                      <CommandItem
                        key={autoPark.id}
                        onSelect={(currentValue) => {
                          const newAutoPark = autoParks.find(
                            (a) => a.name.toLowerCase() === currentValue.toLowerCase()
                          );
                          setSelectedAutoPark(newAutoPark);
                          setOpenAutoPark(false);
                        }}
                        value={autoPark.name}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedAutoPark?.id === autoPark.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {autoPark.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
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
              if (filterType === "autoPark") {
                if (!selectedAutoPark) {
                  return true;
                }
                return reglament.auto_park_id === selectedAutoPark.id;
              }
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
