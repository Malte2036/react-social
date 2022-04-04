import type { AppProps } from "next/app";
import useDarkmode from "../lib/hooks/DarkmodeHook";
import { CookiesProvider } from "react-cookie";
import "./styles/globals.css";
import { useContext } from "react";
import { BackendServiceContext } from "../lib/contexts/BackendServiceContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  const backendService = useContext(BackendServiceContext);

  const [darkmode, setDarkmode] = useDarkmode(backendService);
  return (
    <CookiesProvider>
      <div className={darkmode ? "dark" : ""}>
        <div className="min-h-screen dark:text-white bg-gray-200 dark:bg-slate-900">
          <Component {...pageProps} />
        </div>
      </div>
    </CookiesProvider>
  );
}
