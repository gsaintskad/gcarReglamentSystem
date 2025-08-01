// frontend/src/App.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReglamentSelectionTable from "./components/ReglamentSelectionTable";
import { useEffect, useState } from "react";
import api from "./api/reglamentSystem.api";
import useMainContext from "./contexts/MainContext";
// Removed unused 'glob' import
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
  const [language, setLanguage] = useState("en"); // Initialized to 'en'

  const UKRAINE_FLAG_URL = 'https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg';
  const UK_FLAG_URL = 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg';

  // Define a consistent width variable.
  // Using an arbitrary value like `w-[120px]` is often better for fixed widths.
  // Ensure this value is wide enough for your flags + any desired padding.
  const selectFixedTriggerWidth = "w-[80px]"; // Example: making it much narrower. Adjust as needed.

  return (
    <div className="flex flex-col  items-center py-10 mx-3 h-screen w-full max-sm:max-w-sm  ">
      <div className="md:w-2/3">
        <div className="flex justify-between   items-center">
          <Label> WELCOME TO GCAR REGLAMENT SYSTEM 😎</Label>
          <Select
            onValueChange={(val: string) => setLanguage(val)}
            value={language}
          >
            {/* Apply the fixed width to SelectTrigger */}
            <SelectTrigger className={selectFixedTriggerWidth}>
              <SelectValue>
                {language === "en" && (
                  <div className="flex items-center justify-center h-full w-full"> {/* Center content */}
                    <img src={UK_FLAG_URL} alt="British Flag" className="h-4 w-auto" />
                  </div>
                )}
                {language === "ua" && (
                  <div className="flex items-center justify-center h-full w-full"> {/* Center content */}
                    <img src={UKRAINE_FLAG_URL} alt="Ukrainian Flag" className="h-4 w-auto" />
                  </div>
                )}
                {!language && <span>Select</span>}
              </SelectValue>
            </SelectTrigger>

            {/*
              For SelectContent, use a combination:
              1. `min-w-[var(--radix-select-trigger-width)]`: Ensures it's at least as wide as the trigger.
              2. `w-full`: This works in conjunction with the `min-w` to try and fill the available space,
                 but more importantly, the `min-w` will prevent it from being *smaller* than the trigger.
              3. `max-w-none` (or similar): Ensure no other max-width is conflicting.
            */}
            <SelectContent
              className={`
                ${selectFixedTriggerWidth}
                min-w-[var(--radix-select-trigger-width)]
                max-w-[calc(var(--radix-select-trigger-width) + 2rem)] /* Optional: Cap max width to trigger + some padding if items are very long */
              `}
            >
              <SelectItem value={"en"}>
                <div className="flex items-center justify-center h-full w-full"> {/* Center flags in dropdown items */}
                  <img src={UK_FLAG_URL} alt="British Flag" className="h-4 w-6" />
                </div>
              </SelectItem>
              <SelectItem value={"ua"}>
                <div className="flex items-center justify-center h-full w-full"> {/* Center flags in dropdown items */}
                  <img src={UKRAINE_FLAG_URL} alt="Ukrainian Flag" className="h-4 w-6" />
                </div>
              </SelectItem>
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