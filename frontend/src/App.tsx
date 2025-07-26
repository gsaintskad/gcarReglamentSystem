// frontend/src/App.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReglamentSelectionTable from "./components/ReglamentSelectionTable";
import { useEffect, useState } from "react";
import api from "./api/reglamentSystem.api";
import useMainContext from "./contexts/MainContext"; // Corrected: default import
import { glob } from "fs";
import { Button } from "./components/ui/button";

function App() {
  const { globalState } = useMainContext();

  return (
    <div className="flex flex-col  justify-center items-center px-1 py-10 h-screen w-full border  border-black border-solid rounded-sm">
      <div className="md:w-2/3">
        <div className="flex">
          <Label> WELCOME TO THE GCAR REGLAMENT SYSTEM 😎</Label>

  
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
