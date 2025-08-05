// frontend/src/contexts/MainContext.tsx
import api from "@/api/reglamentSystem.api";
import {
  AutoPark,
  AvailableCar,
  carReglamentDto,
  reglamentType,
} from "@/types/reglament.types";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import {
  getAutoParks,
  getAvailableCarList,
  getCarReglaments,
  getReglamentTypes,
} from "@/utils/reglament.utils";
import {
  getMyTaxiCarActualMileage,
  getMyTaxiCarActualMileages,
} from "@/utils/myTaxi.utils";
import { i18nLanguageType, maintainedLanguages } from "@/i18n";
import * as languages from "@/i18n";
interface GlobalState {
  reglaments: carReglamentDto[] | undefined;
  reglamentTypes: reglamentType[] | undefined;
  i18n: i18nLanguageType | undefined;
  chosenLanguage: maintainedLanguages | undefined;

  autoParks: AutoPark[];
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
    reglamentTypes: undefined,
    i18n: languages.en,
    chosenLanguage: "en",

    autoParks: [],
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
      }, new Set<string>());
      const actualMileageMap: { [key: string]: string } =
        await getMyTaxiCarActualMileages(Array.from(uniqueCars));
      const autoParks = await getAutoParks();

      setGlobalState({
        ...structuredClone(globalState),
        reglaments,
        reglamentTypes,
        autoParks,
      });
    }
    fetchCarsAndReglamentTypes();
  }, []);
  useEffect(() => {
    const i18n: i18nLanguageType = languages[globalState.chosenLanguage!];
    console.log(i18n);
    setGlobalState({
      ...structuredClone(globalState),
      i18n,
      chosenLanguage: globalState.chosenLanguage,
    });
    console.log(globalState);
  }, [globalState.chosenLanguage]);
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
