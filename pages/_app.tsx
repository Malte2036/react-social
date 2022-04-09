import type { AppProps } from "next/app";
import useDarkmode from "../lib/hooks/DarkmodeHook";
import { CookiesProvider, useCookies } from "react-cookie";
import "./styles/globals.css";
import { useContext, useEffect } from "react";
import { BackendServiceContext } from "../lib/contexts/BackendServiceContext";
import { AccountProvider } from "../lib/contexts/AccountContext";
import Script from "next/script";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }: AppProps) {
  const backendService = useContext(BackendServiceContext);
  const [darkmode, setDarkmode] = useDarkmode(backendService);

  const [cookie] = useCookies(["bearerToken"]);
  let router = useRouter();

  const { data: initAccount } = useSWR(
    "/auth/account",
    async () => await backendService.getAccount(cookie.bearerToken)
  );

  if (router.pathname != "/login") {
    if (!initAccount) {
      return (
        <div className={darkmode ? "dark" : ""}>
          <div className="min-h-screen dark:text-white bg-gray-200 dark:bg-slate-900">
            Fetching User Account...
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <Script
        data-website-id={process.env.NEXT_PUBLIC_REACT_APP_UMAMI_ID}
        src={
          process.env.NEXT_PUBLIC_REACT_APP_UMAMI_URL
            ? `${process.env.NEXT_PUBLIC_REACT_APP_UMAMI_URL}/umami.js`
            : ""
        }
        strategy="lazyOnload"
      />
      <CookiesProvider>
        <AccountProvider account={initAccount}>
          <div className={darkmode ? "dark" : ""}>
            <div className="min-h-screen dark:text-white bg-gray-200 dark:bg-slate-900">
              <Component {...pageProps} />
            </div>
          </div>
        </AccountProvider>
      </CookiesProvider>
    </>
  );
}
