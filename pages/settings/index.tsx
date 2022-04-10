import ToogleSwitch from "@/components/form/ToogleSwitch";

export default function SettingsPage(props: {}) {
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
