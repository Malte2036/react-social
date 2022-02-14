import type { AppProps } from "next/app";
import BackendService from "../lib/database/backendService";
import useDarkmode from "../lib/hooks/DarkmodeHook";
import { CookiesProvider } from "react-cookie";
import "./styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const backendService = new BackendService(
    process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL!,
    Number.parseInt(process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT!)
  );

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
