import { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ToogleSwitch from "../../components/form/ToogleSwitch";
import BackendService from "../../database/backendService";
import useAccount from "../../hooks/AccountHook";

export default function SettingsPage(props: {
  backendService: BackendService;
  darkmode: boolean;
  setDarkmode: Dispatch<SetStateAction<boolean>>;
}) {
  const [account] = useAccount(props.backendService);

  let navigate = useNavigate();

  useEffect(() => {
    if (account === null) {
      navigate("/login");
      return;
    }
  }, [account]);

  return (
    <div>
      <h1 className="pt-6 text-center text-5xl font-extrabold ">Settings</h1>
      <br />
      <div className="flex justify-center">
        <h2>Darkmode:</h2>
        <ToogleSwitch
          toogle={props.darkmode}
          setToogle={() => props.setDarkmode(!props.darkmode)}
        ></ToogleSwitch>
      </div>
    </div>
  );
}
