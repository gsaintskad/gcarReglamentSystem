// frontend/src/App.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReglamentSelectionTable from "./components/ReglamentSelectionTable";
import { useEffect, useState } from "react";
import api from "./api/reglamentSystem.api";
import useMainContext from "./contexts/MainContext"; // Corrected: default import
import { glob } from "fs";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function App() {
  const { globalState } = useMainContext();
  const [language, setLanguage] = useState("uk");

  return (
    <div className="flex flex-col  items-center px-1 py-10 h-screen w-full border  border-black border-solid rounded-sm">
      <div className="md:w-2/3">
        <div className="flex justify-between">
          <Label> WELCOME TO THE GCAR REGLAMENT SYSTEM 😎</Label>
          <Select
            onValueChange={(val: string) => setLanguage(val)}
            value={language}
            defaultValue={"en"}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue defaultValue={"en"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"en"}>English</SelectItem>
              <SelectItem value={"ua"}>Українська</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <br></br>
        <br></br>
        {globalState.reglamentTypes ? (
          <ReglamentSelectionTable />
        ) : (
          <Label>Loading...</Label>
        )}
      </div>
    </div>
  );
}

export default App;
