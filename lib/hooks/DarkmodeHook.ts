import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BackendService from "../database/backendService";

export default function useDarkmode(
  backendService: BackendService
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [darkmode, setDarkmode] = useState<boolean>(() => {
    backendService
      .getAccountPrefs()
      .then((accountPrefs) => setDarkmode(accountPrefs.darkmode));
    return true;
  });

  useEffect(() => {
    backendService.updateAccountPrefs({ darkmode: darkmode });
  }, [darkmode]);

  return [darkmode, setDarkmode];
}
