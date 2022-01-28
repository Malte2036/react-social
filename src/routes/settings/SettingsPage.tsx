import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ToogleSwitch from "../../components/form/ToogleSwitch";
import AppwriteService from "../../database/appwriteService";
import useAccount from "../../hooks/AccountHook";
import useDarkmode from "../../hooks/DarkmodeHook";

export default function SettingsPage(props: {
  appwriteService: AppwriteService;
}) {
  const [account] = useAccount(props.appwriteService);
  const [darkmode, setDarkmode] = useDarkmode(props.appwriteService);

  let navigate = useNavigate();

  useEffect(() => {
    if (account === null) {
      navigate("/login");
      return;
    }
  }, [account]);

  return (
    <div>
      <h1 className="mt-6 text-center text-5xl font-extrabold ">Settings</h1>
      <br/>
      <div className="flex justify-center">
        <ToogleSwitch
          toogle={darkmode}
          setToogle={() => setDarkmode(!darkmode)}
        ></ToogleSwitch>
      </div>
    </div>
  );
}
