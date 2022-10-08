import useDarkmode from "@/lib/hooks/DarkmodeHook";
import ToogleSwitch from "@/components/form/ToogleSwitch";

export default function SettingsPage() {
  const { darkmode, setDarkmode } = useDarkmode();

  return (
    <div>
      <h1 className="pt-6 text-center text-5xl font-extrabold ">Settings</h1>
      <br />
      <div className="flex justify-center">
        <h2 className="mr-2">Darkmode:</h2>
        <ToogleSwitch
          toogle={darkmode}
          setToogle={() => setDarkmode(!darkmode)}
        ></ToogleSwitch>
      </div>
    </div>
  );
}
