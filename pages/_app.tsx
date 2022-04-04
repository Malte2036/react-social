import type { AppProps } from "next/app";
import useDarkmode from "../lib/hooks/DarkmodeHook";
import { CookiesProvider, useCookies } from "react-cookie";
import "./styles/globals.css";
import { useContext, useEffect, useState } from "react";
import { BackendServiceContext } from "../lib/contexts/BackendServiceContext";
import { AccountProvider } from "../lib/contexts/AccountContext";
import { Account } from "../lib/database/data/account";
import { Router, useRouter } from "next/router";

export default function MyApp({ Component, pageProps }: AppProps) {
  const backendService = useContext(BackendServiceContext);
  const [darkmode, setDarkmode] = useDarkmode(backendService);

  const [cookie] = useCookies(["bearerToken"]);
  let router = useRouter();

  const [initAccount, setInitAccount] = useState<Account | undefined>(
    undefined
  );

  useEffect(() => {
    if (router.pathname != "/login") {
      const fetchAccount = async () => {
        if (!cookie.bearerToken) {
          router.push("/login");
        } else {
          const account = await backendService.getAccount(cookie.bearerToken);
          console.log(account);
          if (account) {
            setInitAccount(account);
          } else {
            router.push("/login");
          }
        }
      };
      fetchAccount();
    }
  }, [backendService, cookie.bearerToken, router, router.pathname]);

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
    <CookiesProvider>
      <AccountProvider account={initAccount}>
        <div className={darkmode ? "dark" : ""}>
          <div className="min-h-screen dark:text-white bg-gray-200 dark:bg-slate-900">
            <Component {...pageProps} />
          </div>
        </div>
      </AccountProvider>
    </CookiesProvider>
  );
}
