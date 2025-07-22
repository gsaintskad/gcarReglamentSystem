import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CarSelectionTable from "./components/CarSelectionTable";

function App() {
  return (
    <div className="flex flex-col  justify-center px-10 py-10 h-screen">
      <Label> WELCOME TO THE GCAR REGLAMENT SYSTEM</Label>
      <br></br>
      <br></br>
      <CarSelectionTable />
    </div>
  );
}

export default App;
