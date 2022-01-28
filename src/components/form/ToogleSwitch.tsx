import { Dispatch, SetStateAction } from "react";

export default function ToogleSwitch(props: {
  toogle: boolean;
  setToogle: Dispatch<SetStateAction<boolean>>;
  onChange?: Function;
}) {
  return (
    <>
      <h2>Darkmode: </h2>
      <div
        className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer"
        onClick={() => {
          props.setToogle(!props.toogle);
          if (props.onChange) {
            props.onChange();
          }
        }}
      >
        <div
          className={
            "bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform" +
            (props.toogle ? null : " transform translate-x-6")
          }
        ></div>
      </div>
    </>
  );
}
