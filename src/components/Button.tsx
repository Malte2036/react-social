import { MouseEventHandler, ReactElement } from "react";

export default function Button(props: {
  children: ReactElement | string;
  onClickHandler?: MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "button" | "reset";
}) {
  return (
    <button
      onClick={props.onClickHandler}
      type={props.type}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {props.children}
    </button>
  );
}
