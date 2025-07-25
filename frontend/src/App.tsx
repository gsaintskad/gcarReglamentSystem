// frontend/src/App.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReglamentSelectionTable from "./components/ReglamentSelectionTable";
import { useEffect, useState } from "react";
import api from "./api/reglamentSystem.api";
import useMainContext from "./contexts/MainContext"; // Corrected: default import
import { glob } from "fs";

function App() {
  const { globalState } = useMainContext();

  return (
    <div className="flex flex-col  justify-center px-1 py-10 h-screen">
      <Label> WELCOME TO THE GCAR REGLAMENT SYSTEM 😎</Label>
      <br></br>
      <br></br>
      {globalState.reglamentTypes ? (
        <ReglamentSelectionTable />
      ) : (
        <Label>Loading...</Label>
      )}
    </div>
  );
}

export default App;
