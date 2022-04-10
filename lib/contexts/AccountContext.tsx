import { createContext, useContext, useState } from "react";
import { Account } from "../database/data/account";

const AccountContext = createContext<[Account | null | undefined, any]>([
  undefined,
  undefined,
]);

export function AccountProvider(props: {
  account: Account | null | undefined;
  children: any;
}) {
  const [currentAccount, setCurrentAccount] = useState(props.account);

  return (
    <AccountContext.Provider value={[currentAccount, setCurrentAccount]}>
      {props.children}
    </AccountContext.Provider>
  );
}

export const useAccount: () => [any, any] = () => useContext(AccountContext);
