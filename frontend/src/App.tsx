// frontend/src/App.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReglamentSelectionTable from "./components/ReglamentSelectionTable";
import { useEffect, useState } from "react";
import { getCarsJson } from "./types/myTaxi.types";
import api from "./api/reglamentSystem.api";
import useMainContext from "./contexts/MainContext"; // Corrected: default import

function App() {
  const { globalState } = useMainContext();

  const { cars } = globalState;

  return (
    <div className="flex flex-col  justify-center px-10 py-10 h-screen">
      <Label> WELCOME TO THE GCAR REGLAMENT SYSTEM 😎</Label>
      <br></br>
      <br></br>
      {cars ? <ReglamentSelectionTable cars={cars!} /> : <div>Loading...</div>}
    </div>
  );
}

export default App;
