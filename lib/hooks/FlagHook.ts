import { Dispatch, SetStateAction, useEffect, useState } from "react";

export type Flag = {
  writeComments: boolean;
};

export default function useFlag(): [Flag, Dispatch<SetStateAction<Flag>>] {
  const [flags, setFlags] = useState<Flag>(() => {
    const flags = JSON.parse(localStorage.getItem("flags") ?? "{}");
    return flags != undefined ? (flags as Flag) : { writeComments: false };
  });

  useEffect(() => {
    localStorage.setItem("flags", JSON.stringify(flags));
  }, [flags]);

  return [flags, setFlags];
}
