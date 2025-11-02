import { createContext, useContext, useState } from "react";

const MyContext = createContext();

function ContextProvider({ children }) {
  const theme = localStorage.getItem("theme") || "slate";
  const [themeKey, setThemeKey] = useState(theme);
  const [pinDetails, setPinDetails] = useState(null);
  const [availSvc, setAvailSvc] = useState([]);
  const [services, setServices] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [availWorkers, setAvailWorkers] = useState([]);
  const [user, setUser] = useState(null);
  const [globalLoad, setGlobalLoad] = useState(false);

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
        services,
        setServices,
        user,
        setUser,
        globalLoad,
        setGlobalLoad,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export const useMyContext = () => useContext(MyContext);

// 👇 Default export for provider
export default ContextProvider;
