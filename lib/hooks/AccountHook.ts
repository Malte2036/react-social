import { Dispatch, SetStateAction, useState } from "react";
import BackendService from "../database/backendService";
import { Account } from "../database/data/account";

export default function useAccount(
  backendService: BackendService
): [
  Account | null | undefined,
  Dispatch<SetStateAction<Account | null | undefined>>
] {
  const [account, setAccount] = useState<Account | null | undefined>(() => {
    backendService
      .getAccount()
      .then((accountFromDatabase) => setAccount(accountFromDatabase));
    return undefined;
  });

  return [account, setAccount];
}
