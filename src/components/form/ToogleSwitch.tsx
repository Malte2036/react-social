import { Switch } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";

export default function ToogleSwitch(props: {
  toogle: boolean;
  setToogle: Dispatch<SetStateAction<boolean>>;
  onChange?: Function;
}) {
  return (
    <Switch
      checked={props.toogle}
      onChange={() => {
        props.setToogle(!props.toogle);
        if (props.onChange) {
          props.onChange();
        }
      }}
      className={`${
        props.toogle ? "bg-indigo-600" : "bg-slate-800"
      } relative inline-flex items-center h-6 rounded-full w-11`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          props.toogle ? "translate-x-6" : "translate-x-1"
        } inline-block w-4 h-4 transform bg-white rounded-full`}
      />
    </Switch>
  );
}
