import { useCallback, useMemo, useState } from "react";
import * as reglamentTypes from "../types/reglament.types";
import api from "@/api/reglamentSystem.api";
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useMainContext from "@/contexts/MainContext";
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
import { convertCyrillicToLatinLicensePlate } from "@/utils/shared.utils";

/**
 * Interface for the available car data.
 * This is used to define the structure of the objects
 * in the availableCarList.
 */
export interface AvailableCar {
  car_id: string;
  license_plate: string;
  actual_mileage: number;
  last_actualization: Date;
  auto_park_id: string;
}

interface NewReglamentDialogProps {
  cb: () => Promise<any>;
}

export const NewReglamentDialog: React.FC<NewReglamentDialogProps> = ({
  cb,
}: NewReglamentDialogProps) => {
  // State for form fields
  const [reglament_type_id, setReglament_type_id] = useState<number>();
  const [mileage_deadline, setMileage_deadline] = useState<number>();
  const [
    mileage_before_deadline_to_remember,
    setMileage_before_deadline_to_remember,
  ] = useState<number>();
  const [comment, setComment] = useState<string>("");

  // State for the Combobox Popover
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // State for the selected car from the Combobox
  const [selectedCar, setSelectedCar] = useState<
    reglamentTypes.AvailableCar | undefined
  >();

  // Get global state from the context
  const { globalState } = useMainContext();
  const { reglamentTypes: types, i18n, availableCarList, autoParks } = globalState;
  const {
    buttons: buttonsI18n,
    shared: sharedI18n,
    newReglament: newReglamentI18n,
    placeHolders: placeHoldersI18n,
  } = i18n!;

  /**
   * Checks if a car has been selected. This is used to enable/disable
   * the other form fields.
   */
  const isCarSelected = useMemo<boolean>(() => {
    return !!selectedCar;
  }, [selectedCar]);

  /**
   * Creates a new reglament with the selected car and form data.
   * The `car` state is now replaced by `selectedCar`.
   */
  const createReglament = useCallback(async () => {
    if (!selectedCar) {
      console.error("No car selected. Cannot create reglament.");
      return;
    }

    const body = {
      reglament_type_id: String(reglament_type_id),
      car_id: String(selectedCar.car_id),
      license_plate: String(selectedCar.license_plate),
      auto_park_id: String(selectedCar.auto_park_id),
      mileage_deadline,
      mileage_before_deadline_to_remember,
      telegram_id: 12345, // Placeholder telegram ID
      comment,
      mileage_stamp: selectedCar.actual_mileage,
    } as {
      reglament_type_id: string;
      car_id: string;
      license_plate: string;
      auto_park_id: string;
      mileage_deadline: number | undefined;
      mileage_before_deadline_to_remember: number | undefined;
      telegram_id: number;
      comment: string;
      mileage_stamp: number;
    };
    try {
      const response = await api.post("/reglaments/cars", body);
      await cb();
    } catch (error) {
      console.error("Failed to create reglament:", error);
    }
  }, [
    reglament_type_id,
    mileage_deadline,
    mileage_before_deadline_to_remember,
    comment,
    selectedCar,
    cb,
  ]);

  /**
   * Resets all the form fields and closes the dialog.
   * This function is now responsible for clearing the `selectedCar` state.
   */
  const handleResetForm = () => {
    setSelectedCar(undefined);
    setReglament_type_id(undefined);
    setMileage_deadline(undefined);
    setMileage_before_deadline_to_remember(undefined);
    setComment("");
  };

  /**
   * A memoized list of cars filtered by the search term.
   * This allows searching with both Cyrillic and Latin characters by
   * converting both the search term and the license plate.
   */
  const filteredCars = useMemo(() => {
    if (!availableCarList) {
      return [];
    }
    const convertedSearchTerm = convertCyrillicToLatinLicensePlate(
      searchTerm.toLowerCase(),
    );
    if (!convertedSearchTerm) {
      return availableCarList;
    }

    return availableCarList.filter((car) =>
      convertCyrillicToLatinLicensePlate(
        car.license_plate.toLowerCase(),
      ).includes(convertedSearchTerm),
    );
  }, [availableCarList, searchTerm]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-1/2">{buttonsI18n.newReglament}</Button>
      </DialogTrigger>
      <DialogContent className="h-3/4 max-sm:max-w-sm ">
        <DialogHeader>
          <DialogTitle>{newReglamentI18n.title}</DialogTitle>
          <DialogDescription>{newReglamentI18n.description}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <Label>{sharedI18n.licensePlate}: </Label>
          {/* Combobox for searching and selecting a car by license plate */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {selectedCar
                  ? selectedCar.license_plate
                  : placeHoldersI18n.licensePlateInput}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[calc(100%-1rem)] p-0">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Search car..."
                  value={searchTerm}
                  onValueChange={setSearchTerm}
                />
                <CommandEmpty>No car found.</CommandEmpty>
                <CommandGroup>
                  {filteredCars.map((car) => (
                    <CommandItem
                      key={`creation-${car.car_id}`}
                      onSelect={(value) => {
                        const newCar = availableCarList.find(
                          (c) => c.license_plate === value,
                        );
                        setSelectedCar(newCar);
                        setOpen(false);
                      }}
                      value={car.license_plate}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedCar?.car_id === car.car_id
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {car.license_plate}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {isCarSelected && (
            <>
              <Label>{sharedI18n.autoPark}:</Label>
              <Label>{autoParks.find((autoPark) => autoPark.id === selectedCar?.auto_park_id)?.name}</Label>
              <Label>{sharedI18n.mileage}(KM):</Label>
              <Label>{Math.floor(selectedCar!.actual_mileage / 1000)}</Label>
            </>
          )}
          <Label>{sharedI18n.reglamentType}:</Label>
          <Select
            onValueChange={(val: string) => setReglament_type_id(Number(val))}
            disabled={!isCarSelected}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {types!.map((type) => {
                return (
                  <SelectItem
                    key={`new-reglament-select-type-${type.id}`}
                    value={String(type.id)}
                  >
                    {type.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Label>{sharedI18n.notifyAfter}(KM): </Label>
          <Input
            disabled={!isCarSelected}
            onChange={(e) => setMileage_deadline(Number(e.target.value))}
            placeholder="15000"
          ></Input>

          <Label>{sharedI18n.notifyBeforeCompletion}(KM):</Label>
          <Input
            disabled={!isCarSelected}
            onChange={(e) =>
              setMileage_before_deadline_to_remember(Number(e.target.value))
            }
            placeholder="1000"
          ></Input>
          <Label>{sharedI18n.comment}:</Label>
          <Input
            disabled={!isCarSelected}
            onChange={(e) => setComment(String(e.target.value))}
            placeholder={placeHoldersI18n.commentInput}
          ></Input>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={() => {
                createReglament();
                handleResetForm();
                cb();
              }}
              disabled={!isCarSelected}
            >
              {buttonsI18n.create}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewReglamentDialog;
