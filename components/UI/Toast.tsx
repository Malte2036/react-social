import { ToastContextState } from "@/lib/contexts/ToastContext";
import React, { useContext, useState, useEffect, useCallback } from "react";
import useDarkmode from "@/lib/hooks/DarkmodeHook";

export default function Toast() {
  const { ToastData, setToast } = useContext(ToastContextState);
  const [show, setShow] = useState(ToastData.show);
  const Hide = useCallback(() => {
    setShow(false);
    setToast({
      show: false,
      type: "",
      message: "",
    });
  }, [setToast]);

  useEffect(() => {
    setShow(ToastData.show);
    if (ToastData.show) {
      let time = setTimeout(function () {
        Hide();
        clearTimeout(time);
      }, 5000);
    }
  }, [ToastData.show, Hide]);

  const SwitchSvg: any = {
    success: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    warning:
      "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z",
    info: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z",
    error:
      "M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  };

  const Capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  let color: any = {
    success: "text-green-800",
    error: "text-red-600",
    warning: "text-yellow-500",
    info: "text-blue-500",
  };
  console.log(color[ToastData.type]);
  return (
    <div
      className={`transition-all absolute w-1/4 flex justify-between items-top bg-white p-2 rounded-md shadow-lg shadow-grey right-5 z-50 ${
        show ? "top-5" : "-top-20"
      }`}
    >
      <div className={`flex-initial ${color[ToastData.type]} px-1`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={SwitchSvg[`${ToastData.type}`]}
          />
        </svg>
      </div>
      <div className="flex-auto px-1">
        <h3 className={`${color[ToastData.type]} font-semibold`}>
          {Capitalize(ToastData.type)}
        </h3>
        <p className={`text-black`}>{ToastData.message}</p>
      </div>
      <div
        className="flex-initial text-black cursor-pointer px-1"
        onClick={function () {
          Hide();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
}
