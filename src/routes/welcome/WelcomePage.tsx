import React from "react";
import AppwriteService from "../../database/appwriteService";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";

enum welcomeStateType {
  login,
  register,
}

export default function WelcomePage(props: {
  appwriteService: AppwriteService;
}) {
  const [welcomeState, setWelcomeState] =
    React.useState<welcomeStateType | null>(() => {
      props.appwriteService.getAccount().then(async (loggedinAccount) => {
        if (loggedinAccount == null) {
          setWelcomeState(welcomeStateType.login);
          return;
        }
        navigate("/home");
      });
      return null;
    });

  let navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-10 m-4 rounded-lg border-2 drop-shadow-lg">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {welcomeState === welcomeStateType.register
              ? "Register "
              : "Sign in to "}
            your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <span
              onClick={() =>
                setWelcomeState(
                  welcomeState === welcomeStateType.register
                    ? welcomeStateType.login
                    : welcomeStateType.register
                )
              }
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {welcomeState === welcomeStateType.register
                ? "login"
                : "register"}
            </span>
          </p>
          {welcomeState === welcomeStateType.register ? (
            <RegisterForm
              appwriteService={props.appwriteService}
            ></RegisterForm>
          ) : (
            <LoginForm appwriteService={props.appwriteService}></LoginForm>
          )}
        </div>
      </div>
    </div>
  );
}
