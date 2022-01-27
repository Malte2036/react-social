import React from "react";
import { useNavigate } from "react-router-dom";
import AppwriteService from "../../database/appwriteService";
import { LockClosedIcon } from "@heroicons/react/solid";
import InputField from "../../components/form/InputField";

export default function LoginForm(props: { appwriteService: AppwriteService }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  let navigate = useNavigate();

  async function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await props.appwriteService.login(email, password);

      navigate("/home");
    } catch (error) {
      alert(`Error ${error}`);
    }
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
      <div className="rounded-md shadow-sm -space-y-px">
        <InputField
          type="email"
          value={email}
          autoComplete="email"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }
          required
          placeholder="Email address"
          className="rounded-t-md"
        />

        <InputField
          type="password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(event.target.value)
          }
          placeholder="Password"
          required
          className="rounded-b-md"
        />
      </div>
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
