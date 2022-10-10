import { LockClosedIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useContext } from "react";
import InputField from "../../components/form/InputField";
import { useCookies } from "react-cookie";
import { BackendServiceContext } from "@/lib/contexts/BackendServiceContext";
import { ToastContextState } from "@/lib/contexts/ToastContext";

export default function RegisterForm(props: {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}) {
  let router = useRouter();
  const backendService = useContext(BackendServiceContext);
  const ToastService = useContext(ToastContextState);
  const [cookie, setCookie] = useCookies(["bearerToken"]);

  async function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const bearerToken = await backendService.createAccount(
        props.email,
        props.username,
        props.password
      );
      setCookie("bearerToken", bearerToken, { secure: true });

      router.push("/home");
    } catch (error) {
      ToastService.setToast({
        show: true,
        type: "error",
        message: `${error}`,
      });
    }
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
      <div>
        <div className="">
          <InputField
            type="text"
            value={props.username}
            setValue={props.setUsername}
            required
            placeholder="Username"
            className="rounded-t-md"
          />
          <InputField
            type="email"
            value={props.email}
            setValue={props.setEmail}
            autoComplete="email"
            required
            placeholder="Email address"
          />
          <InputField
            type="password"
            value={props.password}
            setValue={props.setPassword}
            placeholder="Password"
            required
            className="rounded-b-md"
          />
        </div>
      </div>
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 umami--click--register-button"
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <LockClosedIcon
            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
            aria-hidden="true"
          />
        </span>
        Register
      </button>
    </form>
  );
}
