import React, { useContext } from "react";
import LoginForm from "../../components/welcome/LoginForm";
import RegisterForm from "../../components/welcome/RegisterForm";

enum welcomeStateType {
  login,
  register,
}

export default function WelcomePage() {
  const [welcomeState, setWelcomeState] =
    React.useState<welcomeStateType | null>(() => welcomeStateType.login);

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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
             
              username={username}
              setUsername={setUsername}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            ></RegisterForm>
          ) : (
            <LoginForm
             
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            ></LoginForm>
          )}
        </div>
      </div>
    </div>
  );
}
