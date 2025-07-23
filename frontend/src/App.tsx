import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CarSelectionTable from "./components/CarSelectionTable";
import { useEffect, useState } from "react";
import { getCarsJson } from "./myTaxi.types";
import api from "./api/reglamentSystem.api";

function App() {
  const [cars, setCars] = useState<getCarsJson[]>([]);
  useEffect(() => {
    console.log("fetching...");
    async function fetchCars() {
      const response = await api.get("/cars");
      const { data } = response;
      const { cars } = data;
      console.log(cars);
      setCars(cars);
    }
    fetchCars();
  }, []);
  return (
    <div className="flex flex-col  justify-center px-10 py-10 h-screen">
      <Label> WELCOME TO THE GCAR REGLAMENT SYSTEM 😎</Label>
      <br></br>
      <br></br>
      <CarSelectionTable cars={cars} />
    </div>
  );
}

export default App;
