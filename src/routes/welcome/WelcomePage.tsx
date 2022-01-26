import React from "react";
import AppwriteService from "../../database/appwriteService";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

enum welcomeStateType {
  login,
  register,
}

export default function WelcomePage(props: {
  appwriteService: AppwriteService;
}) {
  const [welcomeState, setWelcomeState] =
    React.useState<welcomeStateType | null>(null);

  let navigate = useNavigate();

  if (welcomeState === null) {
    props.appwriteService.getAccount().then(async (loggedinAccount) => {
      if (loggedinAccount == null) {
        setWelcomeState(welcomeStateType.register);
        return;
      }
      navigate("/home");
    });
  }

  return (
    <>
      {welcomeState != null ? (
        <>
          {welcomeState === welcomeStateType.register ? (
            <>
              <h1>Register</h1>
              <span className="switchWelcomeStateText">
                or&nbsp;
                <span
                  onClick={() => setWelcomeState(welcomeStateType.login)}
                  style={{ textDecoration: "underline" }}
                >
                  login
                </span>
              </span>
              <RegisterForm
                appwriteService={props.appwriteService}
              ></RegisterForm>
            </>
          ) : (
            <>
              <h1>Login</h1>
              <span className="switchWelcomeStateText">
                or&nbsp;
                <span
                  onClick={() => setWelcomeState(welcomeStateType.register)}
                  style={{ textDecoration: "underline" }}
                >
                  register
                </span>
              </span>
              <LoginForm appwriteService={props.appwriteService}></LoginForm>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
