import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
} from "react";

export default function InputField(props: {
  type: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  className?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  autoComplete?: string;
}) {
  return (
    <div className="rounded-md shadow-sm -space-y-px">
      <div>
        <input
          type={props.type}
          value={props.value}
          autoComplete={props.autoComplete}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            props.setValue(event.target.value);

            if (props.onChange) {
              props.onChange(event);
            }
          }}
          required
          placeholder={props.placeholder}
          className={"appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ".concat(
            props.className ?? ""
          )}
        />
      </div>
    </div>
  );
}
