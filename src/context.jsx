import { createContext, useContext, useState } from "react";
import { themes } from "./assets/exports";

const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const theme = localStorage.getItem("theme") || "slate";
  const [themeKey, setThemeKey] = useState(theme);
  const [pinDetails, setPinDetails] = useState(null);
  const [availSvc, setAvailSvc] = useState([]);
  const [services, setServices] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [availWorkers, setAvailWorkers] = useState([]);

  return (
    <MyContext.Provider
      value={{
        themeKey,
        setThemeKey,
        pinDetails,
        setPinDetails,
        availSvc,
        setAvailSvc,
        availWorkers,
        setAvailWorkers,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
