import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io(
  `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL!}:${Number.parseInt(
    process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT!
  )}`
);
export const SocketContext = createContext(socket);
