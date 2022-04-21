import type { AppProps } from "next/app";
import useDarkmode from "@/lib/hooks/DarkmodeHook";
import { CookiesProvider, useCookies } from "react-cookie";
import "./styles/globals.css";
import { useContext } from "react";
import { BackendServiceContext } from "@/lib/contexts/BackendServiceContext";
import { AccountProvider } from "@/lib/contexts/AccountContext";
import Script from "next/script";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Account } from "@/lib/database/data/account";

export default function MyApp({ Component, pageProps }: AppProps) {
  const backendService = useContext(BackendServiceContext);
  const [darkmode] = useDarkmode(backendService);

  const [cookie] = useCookies(["bearerToken"]);
  let router = useRouter();

  const { data: initAccount, error: initAccountError } = useSWR(
    "/auth/account",
    async () => {
      if (router.pathname != "/login") {
        return await backendService.getAccount(cookie.bearerToken)
      }
      return {};
    },
    {
      onSuccess: (res) => {
        if (!res) {
          router.reload()
        }
      },
      onError: () => router.push("/login")
    }
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
        <AccountProvider account={initAccount === {} ? null : initAccount as Account}>
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
