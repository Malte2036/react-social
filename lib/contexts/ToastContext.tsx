import { createContext, useContext, useState } from "react";

interface ToastInterface {
  show: boolean;
  type: string;
  message: string;
}

interface ToastContext {
  ToastData: ToastInterface;
  setToast: (ToastData: ToastInterface) => void;
}

const DefaultValue: ToastContext = {
  ToastData: {
    show: false,
    type: "",
    message: "",
  },
  setToast: () => undefined,
};

export const ToastContextState = createContext<ToastContext>(DefaultValue);

export const ToastStateProvider = ({ children }: any) => {
  const [ToastData, setToast] = useState(DefaultValue.ToastData);

  return (
    <ToastContextState.Provider value={{ ToastData, setToast }}>
      {children}
    </ToastContextState.Provider>
  );
};
