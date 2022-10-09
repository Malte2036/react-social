import { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";

export default function useDarkmode() {
  const { darkmode, setDarkmode } = useContext(SettingsContext);

  return {
    darkmode,
    setDarkmode,
  };
}
