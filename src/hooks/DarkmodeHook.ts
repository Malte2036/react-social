import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useDarkmode(): [
  boolean,
  Dispatch<SetStateAction<boolean>>
] {
  const [darkmode, setDarkmode] = useState<boolean>(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    localStorage.theme = darkmode ? "dark" : "light";

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
