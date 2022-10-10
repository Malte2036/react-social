import { ToastContextState } from "@/lib/contexts/ToastContext";
import React, { useContext, useState, useEffect, useCallback } from "react";

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

  return (
    <div
      className={`transition-all absolute w-1/4 flex justify-between items-top bg-white p-2 rounded-md shadow-lg shadow-grey right-5 z-50 ${
        show ? "top-5" : "-top-20"
      }`}
    >
      <div className="flex-initial text-green-800 px-1">
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
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div className="flex-auto px-1">
        <h3 className="text-green-800 font-semibold">Success</h3>
        <p className="text-black">this is just for practice</p>
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
