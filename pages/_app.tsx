import type { AppProps } from "next/app";
import useDarkmode from "@/lib/hooks/DarkmodeHook";
import { CookiesProvider, useCookies } from "react-cookie";
import "./styles/globals.css";
import { useContext } from "react";
import { BackendServiceContext } from "@/lib/contexts/BackendServiceContext";
import { AccountProvider } from "@/lib/contexts/AccountContext";
import { SettingsProvider } from "@/lib/contexts/SettingsContext";
import Layout from "./layout";
import Script from "next/script";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Account } from "@/lib/database/data/account";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Toast from "@/components/UI/Toast";
import { ToastStateProvider } from "@/lib/contexts/ToastContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  const backendService = useContext(BackendServiceContext);

  const [cookie] = useCookies(["bearerToken"]);
  let router = useRouter();

  const { data: initAccount, error: initAccountError } = useSWR(
    "/auth/account",
    async () => {
      if (router.pathname != "/login") {
        return await backendService.getAccount(cookie.bearerToken);
      }
      return {};
    },
    {
      onSuccess: (res) => {
        if (!res) {
          router.reload();
        }
      },
      onError: () => router.push("/login"),
    }
  );

  if (router.pathname != "/login") {
    if (!initAccount) {
      return (
        <SettingsProvider>
          <Layout>Fetching User Account...</Layout>
        </SettingsProvider>
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
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_CLIENT_ID ?? ""}
        >
          <AccountProvider
            account={initAccount === {} ? null : (initAccount as Account)}
          >
            <ToastStateProvider>
              <SettingsProvider>
                <Layout>
                  <Toast />
                  <Component {...pageProps} />
                </Layout>
              </SettingsProvider>
            </ToastStateProvider>
          </AccountProvider>
        </GoogleOAuthProvider>
      </CookiesProvider>
    </>
  );
}
