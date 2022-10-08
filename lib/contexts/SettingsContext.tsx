import React, { useEffect, useState, useContext } from "react";
import { BackendServiceContext } from "./BackendServiceContext";

export interface SettingsContextInterface {
  darkmode: boolean;
  setDarkmode: (darkmode: boolean) => void;
}

export const SettingsContext = React.createContext<SettingsContextInterface>({
  darkmode: false,
  setDarkmode: () => undefined,
});

interface Props {
  children: React.ReactNode;
}

export const SettingsProvider = ({ children }: Props) => {
  const backendService = useContext(BackendServiceContext);
  const [darkmode, setDarkmode] = useState(() => {
    backendService
      .getAccountPrefs()
      .then((accountPrefs) => setDarkmode(accountPrefs.darkmode));
    return true;
  });

  useEffect(() => {
    backendService.updateAccountPrefs({ darkmode: darkmode });
  }, [backendService, darkmode]);

  return (
    <SettingsContext.Provider value={{ darkmode, setDarkmode }}>
      {children}
    </SettingsContext.Provider>
  );
};
