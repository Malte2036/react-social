import { createContext } from "react";
import BackendService from "../database/backendService";

export const backendService = new BackendService(
  process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL!,
  Number.parseInt(process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT!)
);
export const BackendServiceContext = createContext(backendService);
