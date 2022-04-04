import { createContext, useContext, useState } from "react";
import { Account } from "../database/data/account";

const AccountContext = createContext(null);

export const AccountProvider = ({ account, children }) => {
  const [currentAccount, setCurrentAccount] = useState(account);

  return (
    <AccountContext.Provider value={[currentAccount, setCurrentAccount]}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount: () => [Account | undefined] = () =>
  useContext(AccountContext);
