import api from "@/api/reglamentSystem.api";
import { getCarsJson } from "@/types/myTaxi.types";
import { reglamentType } from "@/types/reglament.types";
import { getReglamentTypes } from "@/utils/reglament.utils";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface GlobalState {
  cars: getCarsJson[] | undefined;
  reglamentTypes: reglamentType[] | undefined;
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
    cars: undefined,
    reglamentTypes: undefined,
  });

  useEffect(() => {
    console.log("fetching...");
    async function fetchCarsAndReglamentTypes() {
      const response = await api.get("/myTaxi/cars");
      const { data } = response;
      const { cars } = data;

      const reglamentTypes = await getReglamentTypes();
      setGlobalState({ cars, reglamentTypes });
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

// 4. Create a custom hook for easy consumption of the context
export const useMainContext = () => {
  const context = useContext(MainContext);
  if (context === undefined) {
    throw new Error("useMainContext must be used within a MainProvider");
  }
  return context;
};
