// frontend/src/contexts/MainContext.tsx
import api from "@/api/reglamentSystem.api";
import { carReglamentDto, reglamentType } from "@/types/reglament.types";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { getCarReglaments, getReglamentTypes } from "@/utils/reglament.utils";
import { getMyTaxiCarActualMileage, getMyTaxiCarActualMileages } from "@/utils/myTaxi.utils";

interface GlobalState {
  reglaments: carReglamentDto[] | undefined;
  reglamentTypes: reglamentType[] | undefined;
  actualMileageMap: { [key: string]: string } | undefined;
}

interface MainContextType {
  globalState: GlobalState;
  setGlobalState: (newState: GlobalState) => void;
}

const MainContext = createContext<MainContextType | undefined>(undefined);

interface MainProviderProps {
  children: ReactNode;
}

export const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  const [globalState, setGlobalState] = useState<GlobalState>({
    // cars: undefined,
    reglaments: undefined,
    actualMileageMap: undefined,
    reglamentTypes: undefined,
  });

  useEffect(() => {
    console.log("fetching...");
    async function fetchCarsAndReglamentTypes() {
      // const cars: getCarsJson[] = await getMyTaxiCarById();
      const reglamentTypes = await getReglamentTypes();
      const reglaments = await getCarReglaments();
      const uniqueCars = reglaments.reduce((acc, reglament): Set<string> => {
        acc.add(reglament.car_id);
        return acc;
      }, new Set<string>())
      const actualMileageMap: { [key: string]: string } = await getMyTaxiCarActualMileages(Array.from(uniqueCars))
      console.log(actualMileageMap);
      setGlobalState({ reglaments, reglamentTypes, actualMileageMap });
    }
    fetchCarsAndReglamentTypes();
  }, []);
  const contextValue: MainContextType = {
    globalState,
    setGlobalState,
  };

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};

// This is the custom hook that should be default exported
const useMainContext = () => {
  const context = useContext(MainContext);
  if (context === undefined) {
    throw new Error("useMainContext must be used within a MainProvider");
  }
  return context;
};

export default useMainContext;
