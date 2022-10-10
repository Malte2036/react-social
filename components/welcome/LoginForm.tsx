import React, { Dispatch, SetStateAction, useContext } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import InputField from "../../components/form/InputField";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { BackendServiceContext } from "@/lib/contexts/BackendServiceContext";
import { ToastContextState } from "@/lib/contexts/ToastContext";

export default function LoginForm(props: {
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
      const bearerToken = await backendService.login(
        props.email,
        props.password
      );
      setCookie("bearerToken", bearerToken, { secure: true });
      router.push("/home");
    } catch (error) {
      // alert(`Error ${error}`);
      ToastService.setToast({
        show: true,
        type: "success",
        message: "this is it",
      });
    }
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
      <div className="rounded-md shadow-sm -space-y-px">
        <InputField
          type="email"
          value={props.email}
          setValue={props.setEmail}
          autoComplete="email"
          required
          placeholder="Email address"
          className="rounded-t-md"
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
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 umami--click--login-button"
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <LockClosedIcon
            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
            aria-hidden="true"
          />
        </span>
        Sign in
      </button>
    </form>
  );
}
