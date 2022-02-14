import { Dispatch, SetStateAction, useState } from "react";
import BackendService from "../database/backendService";
import { Account } from "../database/data/account";
import { useCookies } from "react-cookie";

export default function useAccount(
  backendService: BackendService
): [
  Account | null | undefined,
  Dispatch<SetStateAction<Account | null | undefined>>
] {
  const [cookie] = useCookies(["bearerToken"]);
  const [account, setAccount] = useState<Account | null | undefined>(() => {
    backendService
      .getAccount(cookie.bearerToken)
      .then((accountFromDatabase) => setAccount(accountFromDatabase));
    return undefined;
  });

  return [account, setAccount];
}
