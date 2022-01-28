import { Dispatch, SetStateAction, useState } from "react";
import AppwriteService from "../database/appwriteService";
import { Account } from "../database/data/account";

export default function useAccount(
  appwriteService: AppwriteService
): [
  Account | null | undefined,
  Dispatch<SetStateAction<Account | null | undefined>>
] {
  const [account, setAccount] = useState<Account | null | undefined>(() => {
    appwriteService
      .getAccount()
      .then((accountFromDatabase) => setAccount(accountFromDatabase));
    return undefined;
  });

  return [account, setAccount];
}
