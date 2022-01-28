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

    if (darkmode) {
      window.document.documentElement.classList.add("dark");
      window.document.documentElement.classList.add("bg-slate-900");
      window.document.documentElement.classList.remove("bg-gray-200");
    } else {
      window.document.documentElement.classList.remove("dark");
      window.document.documentElement.classList.remove("bg-slate-900");
      window.document.documentElement.classList.add("bg-gray-200");
    }
  });

  return [darkmode, setDarkmode];
}
