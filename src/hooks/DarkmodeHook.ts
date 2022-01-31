import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AppwriteService from "../database/appwriteService";

export default function useDarkmode(
  appwriteService: AppwriteService
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [darkmode, setDarkmode] = useState<boolean>(() => {
    appwriteService
      .getAccountPrefs()
      .then((accountPrefs) => setDarkmode(accountPrefs.darkmode));
    return true;
  });

  useEffect(() => {
    appwriteService.updateAccountPrefs({ darkmode: darkmode });
  });

  return [darkmode, setDarkmode];
}
